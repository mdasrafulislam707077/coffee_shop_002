import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.model_selection import train_test_split
import numpy as np
documents = [
    "Document with some text data example 1",
    "Document with some text data example 2",
    "Document with different data example 3",
    "Document with additional text example 4",
    "Document with minor changes example 5",
    "Document text with variations example 6",
    "Document with unique words example 7",
    "Document slightly altered example 8",
    "Document with some unique text example 9",
    "Document with extra details example 10",
    "Document with slightly different wording example 11",
    "Document with altered example text 12",
    "Document with some variation example 13",
    "Document with distinct changes example 14",
    "Document with modified content example 15",
    "Document with different phrasing example 16",
    "Document with additional information example 17",
    "Document with updated text example 18",
    "Document with some different data example 19",
    "Document with a slight twist example 20",
    "Document with altered details example 21",
    "Document with different text example 22",
    "Document with additional example data 23",
    "Document with some new content example 24",
    "Document with different elements example 25",
    "Document with slight variation example 26",
    "Document with updated example data 27",
    "Document with different wording example 28",
    "Document with more text variation example 29",
    "Document with updated details example 30",
    "Document with some changes example 31",
    "Document with modified data example 32",
    "Document with different information example 33",
    "Document with some new examples 34",
    "Document with changed text example 35",
    "Document with additional examples example 36",
    "Document with modified content example 37",
    "Document with unique variations example 38",
    "Document with updated wording example 39",
    "Document with altered text data example 40",
    "my name is Asraful"
]

# Define the query sentence
query_sentence = "Asraful"

def save_model(vectorizer, tfidf_matrix, filename='tfidf_model.joblib'):
    joblib.dump((vectorizer, tfidf_matrix), filename)
    print(f"Model saved to {filename}")

def load_model(filename='tfidf_model.joblib'):
    vectorizer, tfidf_matrix = joblib.load(filename)
    print(f"Model loaded from {filename}")
    return vectorizer, tfidf_matrix

def get_top_n_similar(sentences, query, vectorizer, top_n=10):
    """
    Get the top_n most similar sentences to the given query sentence.

    """
    # Combine the query sentence with the dataset
    all_sentences = sentences + [query]
    
    # Create TF-IDF vectors
    tfidf_matrix = vectorizer.transform(all_sentences)
    
    # Compute the cosine similarity matrix
    similarity_matrix = cosine_similarity(tfidf_matrix)
    for i in similarity_matrix:
        print(i)
    # The index of the query sentence is the last one
    query_index = len(sentences)
    
    # Get the similarity scores for the query sentence
    similarity_scores = similarity_matrix[query_index][:-1]  # exclude the last one (itself)
    # print(similarity_scores)
    # Get indices of the top_n most similar sentences
    top_indices = np.argsort(-similarity_scores)[:top_n]
    
    # Print the top_n similar sentences
    # print(f"\nTop {top_n} most similar sentences to the query sentence '{query}':")
    # for i in top_indices:
    #     print(f"Document {i + 1}: {sentences[i]} (Similarity Score: {similarity_scores[i]:.4f})")

def main():
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(documents)
    
    # Save the model
    save_model(vectorizer, tfidf_matrix)

    # Load the model
    vectorizer, tfidf_matrix = load_model()
    similarity_matrix = cosine_similarity(tfidf_matrix)
    # print("Cosine Similarity Matrix:")
    # print(similarity_matrix)
    X_train, X_test = train_test_split(tfidf_matrix, test_size=0.2, random_state=42)
    
    # Calculate cosine similarity for the training set
    train_similarity_matrix = cosine_similarity(X_train)

    # Calculate cosine similarity for the testing set
    test_similarity_matrix = cosine_similarity(X_test, tfidf_matrix)  # compare test with all documents

    # # Display some of the results
    # print("\nTraining Set Cosine Similarity Matrix (Sample):")
    # print(train_similarity_matrix[:5, :5])  # print a small portion of the training similarity matrix

    # print("\nTesting Set Cosine Similarity Matrix (Sample):")
    # print(test_similarity_matrix[:5, :5])  # print a small portion of the testing similarity matrix
    
    # # Example: Get top 10 similar sentences to the query sentence
    get_top_n_similar(documents, query_sentence, vectorizer, top_n=10)

if __name__ == "__main__":
    main()
