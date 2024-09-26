from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from routers import api
from routers import buyer
from routers import seller

app = FastAPI(docs_url="/docs", openapi_url="/openapi.json")

# Mount the Staticfiles server
app.mount("/static", StaticFiles(directory="static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,   
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def helloworld():
    content = """
    <body>
    <form action="/upload/" enctype="multipart/form-data" method="post">
    <input name="file" type="file">
    <input type="submit">
    </form>
    </body>
        """
    return HTMLResponse(content=content)
    # return {"Hello": "FastAPI is running :)"}

app.include_router(api.router)
app.include_router(buyer.router)
app.include_router(seller.router)