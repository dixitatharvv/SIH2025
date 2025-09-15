import time
import subprocess
import sys

def wait_and_run():
    print("Twitter API rate limit detected. Waiting for rate limit to reset...")
    print("This will take about 2-3 minutes to be safe.")
    
    # Wait 3 minutes (180 seconds) to be extra safe
    wait_time = 180
    print(f"Waiting {wait_time} seconds...")
    
    for i in range(wait_time, 0, -10):
        print(f"Time remaining: {i} seconds", end='\r')
        time.sleep(10)
    
    print("\nRate limit should be reset. Running main script...")
    
    try:
        # Run the main script
        result = subprocess.run([sys.executable, "main.py"], capture_output=True, text=True)
        print("STDOUT:", result.stdout)
        if result.stderr:
            print("STDERR:", result.stderr)
        print("Return code:", result.returncode)
    except Exception as e:
        print(f"Error running main script: {e}")

if __name__ == "__main__":
    wait_and_run()
