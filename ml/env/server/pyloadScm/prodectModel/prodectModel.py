from pydantic import BaseModel
from typing import List
class Prodect(BaseModel):
    id:str | None = "nan"
    aiDescription: str | None = None
    description: str  | None = None
    header: str   | None = None


class ProdectItems(BaseModel):
    prodects:  List[Prodect]