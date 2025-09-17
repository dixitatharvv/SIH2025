from typing import Dict, List, Any
from app.db.models import Verification, VerificationSource

class ConfidenceCalculator:
    """
    Calculates confidence scores based on verification results from multiple sources.
    """
    
    def __init__(self):
        self.weights = {
            VerificationSource.weather_api: 0.4,
            VerificationSource.nlp_pipeline: 0.4,
            VerificationSource.peer_report: 0.2
        }
    
    def calculate_confidence(self, verifications: List[Verification]) -> Dict[str, Any]:
        """
        Calculate overall confidence score based on verification results.
        """
        if not verifications:
            return {"confidence_score": 0.0, "reason": "No verifications available"}
        
        total_score = 0.0
        total_weight = 0.0
        details = {}
        
        for verification in verifications:
            source = verification.source
            result_data = verification.result_data
            
            if source == VerificationSource.weather_api:
                score, reason = self._analyze_weather_result(result_data)
            elif source == VerificationSource.nlp_pipeline:
                score, reason = self._analyze_nlp_result(result_data)
            elif source == VerificationSource.peer_report:
                score, reason = self._analyze_peer_result(result_data)
            else:
                continue
            
            weight = self.weights.get(source, 0.0)
            total_score += score * weight
            total_weight += weight
            
            details[source.value] = {
                "score": score,
                "weight": weight,
                "reason": reason,
                "data": result_data
            }
        
        if total_weight == 0:
            return {"confidence_score": 0.0, "reason": "No valid verifications"}
        
        final_score = total_score / total_weight
        confidence_level = self._get_confidence_level(final_score)
        
        return {
            "confidence_score": round(final_score, 2),
            "confidence_level": confidence_level,
            "total_verifications": len(verifications),
            "details": details,
            "calculation_method": "weighted_average"
        }
    
    def _analyze_weather_result(self, result_data: Dict) -> tuple[float, str]:
        """Analyze weather verification result."""
        if "error" in result_data:
            return 0.0, "Weather analysis failed"
        
        match_status = result_data.get("match_status", "inconclusive")
        
        if match_status == "confirmed":
            return 0.8, "Weather conditions support the report"
        elif match_status == "unconfirmed":
            return 0.2, "Weather conditions don't support the report"
        else:
            return 0.5, "Weather analysis inconclusive"
    
    def _analyze_nlp_result(self, result_data: Dict) -> tuple[float, str]:
        """Analyze NLP verification result."""
        if "error" in result_data:
            return 0.0, "NLP analysis failed"
        
        urgency = result_data.get("urgency", "Medium")
        sentiment = result_data.get("sentiment", "Informative")
        
        # Score based on urgency and sentiment
        urgency_scores = {"Low": 0.3, "Medium": 0.5, "High": 0.7, "Critical": 0.9}
        sentiment_scores = {"Calm": 0.3, "Informative": 0.6, "Worried": 0.8, "Panicked": 0.9}
        
        urgency_score = urgency_scores.get(urgency, 0.5)
        sentiment_score = sentiment_scores.get(sentiment, 0.5)
        
        final_score = (urgency_score + sentiment_score) / 2
        return final_score, f"Urgency: {urgency}, Sentiment: {sentiment}"
    
    def _analyze_peer_result(self, result_data: Dict) -> tuple[float, str]:
        """Analyze peer verification result."""
        if "error" in result_data:
            return 0.0, "Peer verification failed"
        
        # Placeholder for peer verification logic
        return 0.5, "Peer verification pending implementation"
    
    def _get_confidence_level(self, score: float) -> str:
        """Convert numeric score to confidence level."""
        if score >= 0.8:
            return "High"
        elif score >= 0.6:
            return "Medium"
        elif score >= 0.4:
            return "Low"
        else:
            return "Very Low"

# Global instance
confidence_calculator = ConfidenceCalculator()
