from server.app.app import app
from server.pyloadScm.getProdect.getProdect import GetProdectItems
from server.handler.prodectitemsHandler.prodectItemshandlers import prodect_items_extractor
from server.handler.modelBuilder.builder import prodectModel
from sklearn.metrics.pairwise import cosine_similarity
from server.handler.getProdectItems.getProdectItems import getProdectItems
import json
@app.post("/getProdect/")
async def get_prodect_item(prodect_data:GetProdectItems):
    query =  prodect_items_extractor(prodect_data)
    prodects =  prodect_items_extractor(prodect_data,name="prodects")
    result  = getProdectItems(prodects,query)
    if result is not None:
        return {"success": True,"value":result["value"]}
    else:
        return {"success": False}
    
    