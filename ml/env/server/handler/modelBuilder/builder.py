from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
def prodectModel(data)-> bool | dict | None:
    try:
        build_data = {}
        items_data = {
            'id': [],
            'description': []
        }
        for item in data:
            items_data['id'].append(item.id)
            items_data['description'].append(f'''{item.header} {item.aiDescription} {item.aiDescription}''')
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(items_data['description'])
        build_mtx = cosine_similarity(tfidf_matrix)
        for i in range(len(build_mtx)):
            singleMtx = build_mtx[i]
            build_data[items_data["id"][i]] = []
            for j in range(len(singleMtx)):
                build_data[items_data["id"][i]].append({"id":items_data["id"][j],"rate":singleMtx[j] })
        return build_data
    except:
        return False
    






