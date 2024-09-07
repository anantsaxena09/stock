from rest_framework import viewsets
from .models import Stock
from .serializers import StockSerializer
from django.shortcuts import render

class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

def index(request):
    return render(request, 'stocks/index.html')
