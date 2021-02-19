
odoo.define('bi_pos_order_note.PosOrderNotePopupWidget', function(require){
	'use strict';

	const Popup = require('point_of_sale.ConfirmPopup');
	const Registries = require('point_of_sale.Registries');
	const PosComponent = require('point_of_sale.PosComponent');

	class PosOrderNotePopupWidget extends Popup {

		go_back_screen() {
			this.showScreen('ProductScreen');
			this.trigger('close-popup');
		}

		renderElement () {
            var self = this;
            var order = this.env.pos.get_order();
            var selectedOrder = self.env.pos.get('selectedOrder');



            var entered_note = $("#entered_note").val();
            var partner_id = false
            if (order.get_client() != null)
                partner_id = order.get_client();
            var product_id = false
            if (order.get_selected_orderline().product.id != null)
                product_id = order.get_selected_orderline().product.id

                var orderlines = order.orderlines;
                
               var selectedOrderLine = order.get_selected_orderline()

		   selectedOrderLine.set_staystr(entered_note);
		   self.trigger('close-popup');



        }
	}
	
	PosOrderNotePopupWidget.template = 'PosOrderNotePopupWidget';

	Registries.Component.add(PosOrderNotePopupWidget);

	return PosOrderNotePopupWidget;

});