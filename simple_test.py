with open('test_output.txt', 'w') as f:
    f.write('This is a test\n')
    f.write('Python is working!\n')
    
    try:
        import django
        f.write(f'Django version: {django.get_version()}\n')
    except ImportError as e:
        f.write(f'Django import error: {str(e)}\n')
