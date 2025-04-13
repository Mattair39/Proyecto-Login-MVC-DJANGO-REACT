from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Note
from .serializer import NoteSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
    )

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens= response.data
            
            access_token = tokens['access']
            refresh_token = tokens['refresh']
        
            res = Response()
            res.data = {'success': True}
            
            res.set_cookie(
                key='access_token', 
                value=access_token, 
                httponly=True,
                secure=True,
                samesite='None',
                path='/',
            )
            
            res.set_cookie(
                key='refresh_token', 
                value=refresh_token, 
                httponly=True,
                secure=True,
                samesite='None',
                path='/',
            )
            
            return res
            
        except:
            return Response({'success': False})

@api_view(['GET'])
@permission_classes([IsAuthenticated])	
def get_notes(request):
    user = request.user
    notes = Note.objects.filter(owner=user)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)



