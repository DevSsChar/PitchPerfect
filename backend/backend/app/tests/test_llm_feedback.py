import unittest
from app.services.llm_feedback import generate_llm_feedback

class TestLLMFeedback(unittest.TestCase):
    def setUp(self):
        self.transcript = "Hello, this is a test speech. Um, you know, it has some filler words."
        self.text_metrics = {
            "word_count": 15,
            "sentence_count": 2,
            "filler_words": {"um": 1, "you know": 1},
            "readability_scores": {"flesch_reading_ease": 70.0},
            "average_words_per_sentence": 7.5,
            "speaking_rate": 140.0
        }
        self.acoustic_features = {
            "pitch_mean": 120.0,
            "pitch_std": 10.0,
            "energy_mean": 65.0,
            "energy_std": 8.0,
            "jitter": 0.02,
            "shimmer": 0.7,
            "speaking_duration": 30.0,
            "speech_rate": 140.0
        }

    def test_generate_llm_feedback_keys(self):
        result = generate_llm_feedback(self.transcript, self.text_metrics, self.acoustic_features)
        expected_keys = {"summary_feedback", "text_suggestions", "voice_suggestions", "overall_score", "recommendations"}
        self.assertTrue(set(result.keys()) == expected_keys)

if __name__ == "__main__":
    unittest.main()
