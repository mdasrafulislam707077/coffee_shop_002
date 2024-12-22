from pydantic import BaseModel
from typing import List
from server.pyloadScm.prodectModel.prodectModel import Prodect
class GetProdectItems(BaseModel):
    query:str | None = None
    prodects: List[Prodect] | None
