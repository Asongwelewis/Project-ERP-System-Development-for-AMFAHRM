import sqlite3
import os

def check_sqlite():
    db_path = os.path.join(os.path.dirname(__file__), 'db.sqlite3')
    print(f"Checking SQLite database at: {db_path}")
    
    if not os.path.exists(db_path):
        print("❌ Database file does not exist")
        return
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # Check if the auth_user table exists
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='auth_user';")
        if not cursor.fetchone():
            print("❌ auth_user table does not exist")
        else:
            print("✅ auth_user table exists")
            
            # Count users
            cursor.execute("SELECT COUNT(*) FROM auth_user;")
            count = cursor.fetchone()[0]
            print(f"Total users in database: {count}")
            
            # List users
            if count > 0:
                cursor.execute("SELECT id, email, first_name, last_name FROM auth_user;")
                print("\nUsers in database:")
                for row in cursor.fetchall():
                    print(f"- ID: {row[0]}, Email: {row[1]}, Name: {row[2]} {row[3]}")
        
        conn.close()
        
    except Exception as e:
        print(f"❌ Error accessing SQLite database: {e}")

if __name__ == "__main__":
    check_sqlite()
