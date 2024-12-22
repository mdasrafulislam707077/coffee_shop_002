from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
def getProdectItems(prodect,query)-> None | dict:
    try:
         prodectData = {}
         for item in prodect:
             prodectData[item.id]=f'''{item.header} {item.aiDescription}'''
         items = []
         keys = []
         for i in prodectData:
                 items.append(prodectData[i])
                 keys.append(i)
         vectorizer = TfidfVectorizer()
         all_sentences = items + [query]
         tfidf_matrix = vectorizer.fit_transform(all_sentences)
         similarity_matrix = cosine_similarity(tfidf_matrix)
         searchQuery = []
         for i in range(len(all_sentences)-1):
             searchQuery.append({
                  "_id":keys[i],
                  "rate":similarity_matrix[len(similarity_matrix)-1][i]
             }) 
         return {"value":searchQuery}
    except:
         return None
    
    
