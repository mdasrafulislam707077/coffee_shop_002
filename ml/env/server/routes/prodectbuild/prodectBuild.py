from server.app.app import app
from server.pyloadScm.prodectModel.prodectModel import ProdectItems
from server.handler.prodectitemsHandler.prodectItemshandlers import prodect_items_extractor
from server.handler.modelBuilder.builder import prodectModel
import json
@app.post("/similar/")
async def read_item(prodect_data:ProdectItems):
    data =  prodect_items_extractor(prodect_data,name="prodects")
    result = prodectModel(data)
    if result is not False:
        return {"success": True,"matx":json.dumps(result)}
    else:
        return {"success": False}
    return {"success": False}
