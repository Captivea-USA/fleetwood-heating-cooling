odoo.define('bi_pos_order_note.pos', function(require){
	'use strict';

	var models = require('point_of_sale.models');

    var core = require('web.core');

    var field_utils = require('web.field_utils');
    var rpc = require('web.rpc');
    var session = require('web.session');
    var time = require('web.time');
    var utils = require('web.utils');
    var _t = core._t;


    models.load_models({
        model: 'pos.order.line',
        fields: ['notes_product_line'],
        domain: null,
        loaded: function(self, pos_order_line) {
            
            self.pos_order_line = pos_order_line;
        },
    });



    models.load_models({
        model: 'pos.order',
        fields: ['pos_ordernote'],
        domain: function(self){ return [['session_id', '=', self.pos_session.name],['state', 'not in', ['draft', 'cancel']]]; },
        loaded: function(self, pos_order) {
            self.pos_order = pos_order;
        },
    });



        // exports.Orderline = Backbone.Model.extend ...
    var OrderlineSuper = models.Orderline;
    models.Orderline = models.Orderline.extend({
		initialize: function(attr,options){
		OrderlineSuper.prototype.initialize.apply(this, arguments);
        this.pos   = options.pos;
        this.order = options.order;
        this.stayStr = false;
        if (options.json) {
            this.init_from_JSON(options.json);
            return;
        }

        this.set_staystr();

    },
    clone: function(){
        var orderline = new exports.Orderline({},{
            pos: this.pos,
            order: null,
            product: this.product,
            price: this.price,
        });
        
        orderline.quantity = this.quantity;
        orderline.quantityStr = this.quantityStr;
        orderline.stayStr = this.stayStr;
        orderline.discount = this.discount;
        orderline.type = this.type;
        orderline.selected = false;
        return orderline;
    },
    
    set_staystr: function(entered_note){
    
	  this.stayStr = entered_note;
	  this.trigger('change',this);
    },

    get_to_stay: function(){
        return this.stayStr;
    },

    export_for_printing: function(){
        return {
            quantity:           this.get_quantity(),
            unit_name:          this.get_unit().name,
            price:              this.get_unit_display_price(),
            discount:           this.get_discount(),
            product_name:       this.get_product().display_name,
            product_name_wrapped: this.generate_wrapped_product_name(),
            price_lst:          this.get_lst_price(),
            display_discount_policy:    this.display_discount_policy(),
            price_display_one:  this.get_display_price_one(),
            price_display :     this.get_display_price(),
            price_with_tax :    this.get_price_with_tax(),
            price_without_tax:  this.get_price_without_tax(),
            price_with_tax_before_discount:  this.get_price_with_tax_before_discount(),
            tax:                this.get_tax(),
            notes:              this.get_to_stay(),
            product_description:      this.get_product().description,
            product_description_sale: this.get_product().description_sale,
        };
    },

    export_as_JSON: function() {
        var pack_lot_ids = [];
        if (this.has_product_lot){
            this.pack_lot_lines.each(_.bind( function(item) {
                return pack_lot_ids.push([0, 0, item.export_as_JSON()]);
            }, this));
        }
        return {
            qty: this.get_quantity(),
            price_unit: this.get_unit_price(),
            price_subtotal: this.get_price_without_tax(),
            price_subtotal_incl: this.get_price_with_tax(),
            discount: this.get_discount(),
            product_id: this.get_product().id,
            tax_ids: [[6, false, _.map(this.get_applicable_taxes(), function(tax){ return tax.id; })]],
            id: this.id,
            pack_lot_ids: pack_lot_ids,
	    notes_product_line: this.get_to_stay()

        };
    },

    
    
    });
    // End Orderline start


    var OrderSuper = models.Order;
    models.Order = models.Order.extend({


    	get_pos_ordernote: function() {
	    var pos_ordernote = $("#pos_ordernote").val();
	    return pos_ordernote;
        },
        
        export_as_JSON: function() {
            var self = this;
            var loaded = OrderSuper.prototype.export_as_JSON.call(this);
            loaded.pos_ordernote = self.get_pos_ordernote();
            return loaded;
        },

   

    
    
    });
    // End Orderline start


});
