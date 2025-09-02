with open('output.txt', 'w') as f:
    f.write('Test output from Python script\n')
    f.write('This is a test to see if Python can write to a file\n')
    try:
        import django
        f.write(f'Django version: {django.get_version()}\n')
    except ImportError:
        f.write('Django is not installed\n')
