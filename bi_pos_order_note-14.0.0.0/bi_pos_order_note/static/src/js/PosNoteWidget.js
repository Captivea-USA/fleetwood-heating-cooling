odoo.define('bi_pos_order_note.PosNoteWidget', function(require){
	'use strict';

	const PosComponent = require('point_of_sale.PosComponent');
    const Registries = require('point_of_sale.Registries');
    const { useListener } = require('web.custom_hooks');
    const { useState, useRef, useContext } = owl.hooks;
    const { debounce } = owl.utils;
    const { loadCSS } = require('web.ajax');
    const utils = require('web.utils');
    const { Gui } = require('point_of_sale.Gui');
    const ProductScreen = require('point_of_sale.ProductScreen');
    const Popup = require('point_of_sale.ConfirmPopup');
    // var QWeb = core.qweb;

    class PosNoteWidget extends ProductScreen {
        constructor() {
            super(...arguments);
            this.button_click();
        }

         async button_click(){
            var self = this;
            var order = self.env.pos.get('selectedOrder');
            var orderlines = order.orderlines;
            if (orderlines.length === 0) {
                self.showPopup('CustomErrorPopup',{
	                'title': 'Error',
	                
	            });
                return;
            }
            else{
            
	            self.showPopup('PosOrderNotePopupWidget',{
	                'title': 'Product Note',
	                
	            });
        	}
                      
        }
    }
    PosNoteWidget.template = 'PosNoteWidget';

    Registries.Component.add(PosNoteWidget);

    return PosNoteWidget;
});
            