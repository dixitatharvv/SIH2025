#!/usr/bin/env python3
"""
API Usage Pattern Analysis
Analyzes your current usage patterns and provides recommendations
"""

import json
import os
from datetime import datetime, timedelta

def analyze_api_usage():
    print("🔍 API USAGE PATTERN ANALYSIS")
    print("=" * 50)
    
    # Check if since_id.txt exists and get last run info
    since_id_file = "since_id.txt"
    if os.path.exists(since_id_file):
        with open(since_id_file, 'r') as f:
            since_id = f.read().strip()
        print(f"📊 Last processed tweet ID: {since_id}")
        print(f"📅 Since ID suggests you've been running the script")
    else:
        print("📊 No since_id.txt found - script hasn't been run yet")
    
    print("\n🎯 CURRENT CONFIGURATION:")
    print("-" * 30)
    print("• Tweets per run: 5 (reduced from 10)")
    print("• Delay between Gemini calls: 2-3.5 seconds")
    print("• Twitter API calls per run: 1")
    print("• Gemini API calls per run: 5")
    
    print("\n📈 API LIMITS & USAGE:")
    print("-" * 30)
    
    # Twitter API Analysis
    print("🐦 TWITTER API v2:")
    print("  • Limit: 300 requests per 15-minute window")
    print("  • Your usage: 1 request per run")
    print("  • Safe frequency: Every 3 seconds (theoretical)")
    print("  • Recommended: Every 5-10 minutes")
    
    # Gemini API Analysis  
    print("\n🤖 GEMINI API:")
    print("  • Free tier: 15 requests per minute")
    print("  • Your usage: 5 requests per run")
    print("  • Processing time: ~15-20 seconds per run")
    print("  • Safe frequency: Every 1-2 minutes")
    
    print("\n⚠️  RATE LIMIT CAUSES:")
    print("-" * 30)
    print("1. 🔄 FREQUENT EXECUTION")
    print("   - You're likely running the script too often")
    print("   - Each run makes 1 Twitter + 5 Gemini calls")
    print("   - If running every few minutes, you'll hit limits")
    
    print("\n2. 🚀 NO SCHEDULING")
    print("   - Manual execution leads to inconsistent timing")
    print("   - No built-in delays between runs")
    print("   - Easy to accidentally run multiple times")
    
    print("\n3. 📊 NO USAGE TRACKING")
    print("   - No monitoring of API quota usage")
    print("   - No awareness of remaining requests")
    print("   - No adaptive behavior based on limits")
    
    print("\n💡 RECOMMENDATIONS:")
    print("-" * 30)
    
    print("1. ⏰ SCHEDULE YOUR RUNS")
    print("   • Run every 15-30 minutes (not every few minutes)")
    print("   • Use Windows Task Scheduler or cron")
    print("   • Set consistent intervals")
    
    print("\n2. 📊 MONITOR USAGE")
    print("   • Track API calls per hour/day")
    print("   • Implement usage counters")
    print("   • Add logging for rate limit events")
    
    print("\n3. 🎛️  OPTIMIZE SETTINGS")
    print("   • Reduce tweets per run to 3-5")
    print("   • Increase delays between calls")
    print("   • Consider batch processing")
    
    print("\n4. 🔄 IMPLEMENT BACKOFF")
    print("   • Exponential backoff on rate limits")
    print("   • Automatic retry with increasing delays")
    print("   • Graceful degradation")
    
    print("\n📋 SUGGESTED SCHEDULE:")
    print("-" * 30)
    print("• Every 15 minutes: 1 Twitter call + 5 Gemini calls")
    print("• Per hour: 4 runs = 4 Twitter + 20 Gemini calls")
    print("• Per day: 96 runs = 96 Twitter + 480 Gemini calls")
    print("• This stays well within limits!")
    
    print("\n🚨 CURRENT ISSUE:")
    print("-" * 30)
    print("You've hit the Twitter API rate limit (429 error)")
    print("This means you've made 300+ requests in the last 15 minutes")
    print("Wait 10-15 minutes before running again")

def calculate_optimal_schedule():
    print("\n🎯 OPTIMAL SCHEDULE CALCULATOR:")
    print("=" * 50)
    
    # Twitter limits
    twitter_requests_per_15min = 300
    twitter_requests_per_run = 1
    
    # Gemini limits (free tier)
    gemini_requests_per_minute = 15
    gemini_requests_per_run = 5
    
    # Calculate safe intervals
    twitter_safe_interval = (15 * 60) / twitter_requests_per_15min  # seconds
    gemini_safe_interval = (60 / gemini_requests_per_minute) * gemini_requests_per_run  # seconds
    
    # Use the more restrictive limit
    safe_interval = max(twitter_safe_interval, gemini_safe_interval)
    
    print(f"Twitter safe interval: {twitter_safe_interval:.1f} seconds")
    print(f"Gemini safe interval: {gemini_safe_interval:.1f} seconds")
    print(f"Recommended interval: {safe_interval:.1f} seconds ({safe_interval/60:.1f} minutes)")
    
    # Calculate daily usage
    runs_per_day = (24 * 60 * 60) / safe_interval
    twitter_daily_usage = runs_per_day * twitter_requests_per_run
    gemini_daily_usage = runs_per_day * gemini_requests_per_run
    
    print(f"\nDaily usage at this interval:")
    print(f"• Runs per day: {runs_per_day:.0f}")
    print(f"• Twitter requests: {twitter_daily_usage:.0f}")
    print(f"• Gemini requests: {gemini_daily_usage:.0f}")

if __name__ == "__main__":
    analyze_api_usage()
    calculate_optimal_schedule()
