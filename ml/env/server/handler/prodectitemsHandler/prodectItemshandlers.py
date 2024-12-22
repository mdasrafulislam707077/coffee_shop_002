from server.pyloadScm.prodectModel.prodectModel import ProdectItems
def prodect_items_extractor(prodects:ProdectItems,name="query"):
    for item in prodects:
        if name == item[0]:
            return item[1]