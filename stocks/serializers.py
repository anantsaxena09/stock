# serializers.py

from rest_framework import serializers
from .models import Stock

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['id', 'name', 'ticker_symbol', 'price']

    def validate_ticker_symbol(self, value):
        if Stock.objects.filter(ticker_symbol=value).exists():
            raise serializers.ValidationError("Stock with this ticker symbol already exists.")
        return value
