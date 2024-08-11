// services.component.ts
import { Component, OnInit } from '@angular/core';
import { MainApiService } from '../main-api.service';
import { Console } from 'console';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: any[] = [];
  categories: any[] = [];
  items: any[] = [];
  measurement: any[] = [];
  subscriptions: any[] = [];
  loading: boolean = true;

  constructor(private api: MainApiService) { }

  ngOnInit(): void {
    this.loadServices();
  }

  getList(categoryId: string) {
    var item_list = this.items.filter(c=>c.CategoryId == categoryId)
    return item_list.length == 0 ? [] : item_list;
  }

  getItemPrice(itemId: string) {
    var itemlist = this.items.filter(c=>c.Item.id==itemId);
    return itemlist.length == 0 ? 0.00 : itemlist[0].Price;
  }

  getItem(itemId: string) {
    var itemlist = this.items.filter(c=>c.Item.id==itemId);
    return itemlist.length == 0 ? [] : itemlist[0];
  }


  getMeasurement(itemId: string) {
    var items_ = this.items.filter(v => v.Item.id == itemId);
    if (items_.length != 0) {
        var Variation = items_[0]?.Item?.itemData?.variations
        if (Variation.length != 0) {
            var measure = Variation[0].itemVariationData?.measurementUnitId
            if (measure) {
                var measurement = this.measurement.filter(m => m.Id = measure)
                if (measurement.length != 0) {
                    switch(measurement[0].Measurement) {
                        case "GENERIC_HOUR":
                            return "/hr"
                        default: 
                            return "";
                    }
                }
            }
        }
    }
    return "";
  }

  async loadServices() {
    this.services = await this.api.getCatalog();
    this.loading = false;
    this.services.forEach((c) => {
        if (c.type == "CATEGORY") {
            if (c.categoryData.name != 'Subscriptions') {
                this.categories.push({CategoryName: c.categoryData.name, CategoryId: c.id, Category: c});
            }
        } else if (c.type == "MEASUREMENT_UNIT") {
            this.measurement.push({Id: c.id, Measurement: c?.measurementUnitData?.measurementUnit?.timeUnit});
        } else if (c.type == "SUBSCRIPTION_PLAN") {
            var itemRefs = c.subscriptionPlanData.eligibleItemIds;
            var refs = c.subscriptionPlanData.subscriptionPlanVariations;
            var billing = 'INVALID';
            if (refs.length != 0) {
                refs = refs[0].subscriptionPlanVariationData.phases
                if (refs.length != 0) {
                    billing = refs[0].cadence
                }
            }
            this.subscriptions.push({Id: c.id, SubscriptionName: c.subscriptionPlanData.name, BillingCycle: billing, ItemRef: itemRefs.length == 0 ? '' : itemRefs[0]});
        } else if(c.type == "ITEM") {
            var Item = -1;
            if (c.itemData.categories && c.itemData.categories.length > 0) {
                Item = this.items.push({CategoryId: c.itemData.categories[0].id, SUB: false, Description: c.itemData.description, Item: c, Price: 0, PriceType: "USD"});
            } else {
                Item = this.items.push({CategoryId: "", Item: c, SUB: false, Description: c.itemData.description, Price: 0, PriceType: "USD"});
            }
            if (Item != -1) {
                var d = this.items.at(Item-1)
                if (c?.itemData?.name.match('\\[Subscription\\]')) {
                    d.SUB = true;
                }
                var Variation = c?.itemData?.variations
                if (Variation.length != 0) {
                    d.Price = parseFloat(Variation[0]?.itemVariationData?.priceMoney?.amount)/100;
                    d.PriceType = Variation[0]?.itemVariationData?.priceMoney?.currency;
                }
            }

        }
    })
  }
}
