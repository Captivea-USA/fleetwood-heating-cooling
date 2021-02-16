# Part of Softhealer Technologies.
{
    "name": "POS Product Warehouse Qty",
    "author": "Softhealer Technologies",
    "website": "https://www.softhealer.com",
    "support": "support@softhealer.com",
    "license": "OPL-1",
    "category": "Point Of Sale",
    "summary": "POS Warehouse Quantity Module,Warehouse Available Stock App, Point Of Sale Warehouse Product Quantity, POS Warehouse Management, POS Inventory Management, Get Point Of Sale Stock Detail, See POS Available Stock QTY Odoo",
    "description": """Do you want to display warehouse or locations product stock in the POS? Your warehouse and warehouse locations play an important role in product sales. You have to make sure that the ordered goods are in stock. This module helps to display the available stock quantity of all products in the POS. Here you get the total product quantity and how much quantity available in each warehouse or location.""",
    "version": "14.0.3",
    "depends": ["point_of_sale"],
    "application": True,
    "data": [
        'views/pos_config_settings.xml',
        'views/assets.xml',
    ],
    "images": ["static/description/background.png", ],
    "qweb": ["static/src/xml/pos.xml"],
    "auto_install": False,
    "installable": True,
    "price": "25",
    "currency": "EUR"
}
