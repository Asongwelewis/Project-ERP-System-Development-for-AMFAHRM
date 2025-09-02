import sys
import os

def main():
    with open('env_output.txt', 'w') as f:
        f.write('Python Environment Test\n')
        f.write('=====================\n\n')
        
        # Python version and paths
        f.write(f'Python Version: {sys.version}\n')
        f.write(f'Executable: {sys.executable}\n')
        f.write(f'Current Working Directory: {os.getcwd()}\n')
        f.write('\nSystem Path:\n')
        for path in sys.path:
            f.write(f'  {path}\n')
        
        # Check Django
        f.write('\nDjango Check:\n')
        try:
            import django
            f.write(f'Django Version: {django.get_version()}\n')
        except ImportError as e:
            f.write(f'Django Import Error: {str(e)}\n')
        
        # List files in current directory
        f.write('\nFiles in current directory:\n')
        try:
            files = os.listdir('.')
            for file in files:
                f.write(f'  {file}\n')
        except Exception as e:
            f.write(f'Error listing directory: {str(e)}\n')

if __name__ == "__main__":
    main()
