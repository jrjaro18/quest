# server.py
from fastapi import FastAPI, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
import os
import PyPDF2 as pdf
import time

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, you can specify specific origins if needed
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

UPLOAD_DIRECTORY = "pdfs"  # Directory where PDF files will be saved

# Create the upload directory if it doesn't exist
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    time.sleep(15)
    print("Done")
    {"res":"Created and Linked PDF with LLM"}

@app.post("/query-pdf/")
async def queryPDF(request: Request):
    data = await request.json()
    input_text = data['text']
    time.sleep(5)
    return {"res": "he heheh hehehhe hehehehe hhehehehhehehe hehhe heh heh heheh hehehehhehh h eheh he heheh hehehhe hehehehe hhehehehhehehe hehhe heh heh heheh hehehehhehh h eheh"}

@app.get("/")
async def new():
    return {"hello":"rohan"}