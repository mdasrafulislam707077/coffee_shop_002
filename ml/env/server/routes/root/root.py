from server.app.app import app
@app.get("/")
def read_root():
    return {"fast-server": "active"}