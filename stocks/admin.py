from django.contrib import admin
from .models import Stock

class StockAdmin(admin.ModelAdmin):
    list_display = ('name', 'ticker_symbol', 'price')
    search_fields = ('name', 'ticker_symbol')
    list_filter = ('ticker_symbol',)

admin.site.register(Stock, StockAdmin)
