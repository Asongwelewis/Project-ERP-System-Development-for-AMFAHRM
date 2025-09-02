import sys
import os

def main():
    print("Python test script running...")
    print(f"Python version: {sys.version}")
    print(f"Current directory: {os.getcwd()}")
    print("Files in directory:", os.listdir('.'))
    
    try:
        import django
        print(f"Django version: {django.get_version()}")
    except ImportError:
        print("Django is not installed")

if __name__ == "__main__":
    main()
