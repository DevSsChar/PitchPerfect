import unittest
from datetime import datetime
from app.services.report_generator import generate_report

class TestReportGenerator(unittest.TestCase):
    def setUp(self):
        self.transcript = "This is a test transcript."
        self.text_analysis = {
            "word_count": 10,
            "sentence_count": 1,
            "filler_words": {"um": 1},
            "readability_scores": {"flesch_reading_ease": 70.0},
            "average_words_per_sentence": 10.0,
            "speaking_rate": 120.0
        }
        self.acoustic_features = {
            "pitch_mean": 120.0,
            "pitch_std": 10.0,
            "energy_mean": 65.0,
            "energy_std": 8.0,
            "jitter": 0.02,
            "shimmer": 0.7,
            "speaking_duration": 30.0,
            "speech_rate": 120.0
        }
        self.llm_feedback = {
            "summary_feedback": "Good job!",
            "text_suggestions": ["Reduce filler words"],
            "voice_suggestions": ["Vary your pitch"],
            "overall_score": 8,
            "recommendations": ["Practice more"]
        }

    def test_generate_report_with_llm(self):
        report = generate_report(
            self.transcript,
            self.text_analysis,
            self.acoustic_features,
            self.llm_feedback,
            user_id="user123",
            session_id="sess456"
        )
        self.assertEqual(report["transcript"], self.transcript)
        self.assertEqual(report["text_analysis"], self.text_analysis)
        self.assertEqual(report["acoustic_features"], self.acoustic_features)
        self.assertEqual(report["llm_feedback"], self.llm_feedback)
        self.assertEqual(report["user_id"], "user123")
        self.assertEqual(report["session_id"], "sess456")
        self.assertIn("generated_on", report)
        # Check serializability
        import json
        json.dumps(report)

    def test_generate_report_without_llm(self):
        report = generate_report(
            self.transcript,
            self.text_analysis,
            self.acoustic_features
        )
        self.assertEqual(report["llm_feedback"]["summary_feedback"], "LLM feedback not available, please check later.")
        import json
        json.dumps(report)

if __name__ == "__main__":
    unittest.main()
