import tkinter as tk
from tkinter import ttk, messagebox
from datetime import datetime
import os

def save_entry():
    entry_text = entry.get("1.0", "end-1c")
    if entry_text.strip() != "":
        date = datetime.now().strftime("%Y-%m-%d")
        with open(f"{date}.txt", "w") as f:
            f.write(entry_text)
        messagebox.showinfo("Success", "Entry saved successfully!")
        update_entries()
    else:
        messagebox.showwarning("Empty Entry", "Please write something before saving.")

def update_entries():
    for tab_id in tabs():
        entries_tab.forget(tab_id)

    files = sorted(os.listdir(), reverse=True)
    dates = set()
    for file in files:
        if file.endswith(".txt"):
            date = file[:-4]
            dates.add(date)

    for date in sorted(dates):
        date_tab = tk.Frame(entries_tab, bg="#f0f0f0")
        entries_tab.add(date_tab, text=date)

        with open(f"{date}.txt", "r") as f:
            content = f.read()
        
        entry_text = tk.Text(date_tab, height=10, width=50, bg="#f0f0f0")
        entry_text.pack(padx=20, pady=20)
        entry_text.insert("end", content)
        entry_text.config(state="disabled", bg="#f0f0f0", wrap="word")

def tabs():
    return entries_tab.tabs()

def close_login_window():
    login_window.destroy()

def login():
    username = username_entry.get()
    password = password_entry.get()

    if authenticate(username, password):
        close_login_window()  # Close the login window
        root.deiconify()  # Show the main window
    else:
        messagebox.showerror("Login Failed", "Invalid username or password")

def authenticate(username, password):
    user_file_path = f"users/{username}.txt"
    if os.path.exists(user_file_path):
        with open(user_file_path, "r") as f:
            stored_password = f.read().strip()
            if stored_password == password:
                return True
    return False

def open_registration_window():
    registration_window = tk.Toplevel()
    registration_window.title("Register New User")

    # Styling for registration window
    registration_window.configure(bg="#f0f0f0")

    # New Username Entry
    new_username_label = tk.Label(registration_window, text="New Username:", font=("Helvetica", 12), bg="#f0f0f0")
    new_username_label.pack()
    new_username_entry = tk.Entry(registration_window, font=("Helvetica", 10))
    new_username_entry.pack(pady=5)

    # New Password Entry
    new_password_label = tk.Label(registration_window, text="New Password:", font=("Helvetica", 12), bg="#f0f0f0")
    new_password_label.pack()
    new_password_entry = tk.Entry(registration_window, show="*", font=("Helvetica", 10))
    new_password_entry.pack(pady=5)

    # Confirm Password Entry
    confirm_password_label = tk.Label(registration_window, text="Confirm Password:", font=("Helvetica", 12), bg="#f0f0f0")
    confirm_password_label.pack()
    confirm_password_entry = tk.Entry(registration_window, show="*", font=("Helvetica", 10))
    confirm_password_entry.pack(pady=5)

    # Register Button
    def register():
        new_username = new_username_entry.get()
        new_password = new_password_entry.get()
        confirm_password = confirm_password_entry.get()

        if new_username.strip() == "" or new_password.strip() == "":
            messagebox.showerror("Registration Failed", "Username and password cannot be empty")
            return

        if new_password != confirm_password:
            messagebox.showerror("Registration Failed", "Passwords do not match")
            return

        user_file_path = f"users/{new_username}.txt"
        user_directory = "users"
        if not os.path.exists(user_directory):
            os.makedirs(user_directory)
        if os.path.exists(user_file_path):
            messagebox.showerror("Registration Failed", "Username already exists")
            return

        with open(user_file_path, "w") as f:
            f.write(new_password)

        messagebox.showinfo("Success", "Registration successful! You can now login.")

        # Close the registration window after successful registration
        registration_window.destroy()

    register_button = tk.Button(registration_window, text="Register", command=register, font=("Helvetica", 12), bg="#008CBA", fg="#fff", padx=10, pady=5)
    register_button.pack(pady=10)

# Create the login window
login_window = tk.Tk()
login_window.title("Login")

# Styling for login window
login_window.configure(bg="#f0f0f0")

# Logo
logo_label = tk.Label(login_window, text="Pennies 4 Thoughts", font=("Helvetica", 24, "bold"), bg="#f0f0f0", fg="#333")
logo_label.pack(pady=20)

# Username Entry
username_label = tk.Label(login_window, text="Username:", font=("Helvetica", 12), bg="#f0f0f0")
username_label.pack()
username_entry = tk.Entry(login_window, font=("Helvetica", 10))
username_entry.pack(pady=5)

# Password Entry
password_label = tk.Label(login_window, text="Password:", font=("Helvetica", 12), bg="#f0f0f0")
password_label.pack()
password_entry = tk.Entry(login_window, show="*", font=("Helvetica", 10))
password_entry.pack(pady=5)

# Login Button
login_button = tk.Button(login_window, text="Login", command=login, font=("Helvetica", 12), bg="#008CBA", fg="#fff", padx=10, pady=5)
login_button.pack(pady=10)

# New User Registration Button
register_button = tk.Button(login_window, text="New User", command=open_registration_window, font=("Helvetica", 12), bg="#008CBA", fg="#fff", padx=10, pady=5)
register_button.pack(pady=10)

# Run the login window
login_window.mainloop()

# Create the main window
root = tk.Tk()
root.title("Pennies 4 Thoughts")

# Make the window fullscreen
root.attributes("-fullscreen", True)

# Create a gradient background
canvas = tk.Canvas(root, width=root.winfo_screenwidth(), height=root.winfo_screenheight(), highlightthickness=0)
canvas.pack()
gradient = tk.PhotoImage(file="gradient.png")
canvas.create_image(0, 0, anchor=tk.NW, image=gradient)

# Styling
style = ttk.Style()
style.configure("TNotebook", background="#f0f0f0")
style.configure("TNotebook.Tab", background="#d9d9d9", foreground="#000", padding=[10, 5], font=("Helvetica", 10, "bold"))
style.map("TNotebook.Tab", background=[("selected", "#f0f0f0")])

# Logo
logo_frame = tk.Frame(root, bg="#f0f0f0")
logo_frame.place(relx=0.5, rely=0.05, anchor=tk.CENTER)

logo_label = tk.Label(logo_frame, text="Pennies 4 Thoughts", font=("Helvetica", 32, "bold"), bg="#f0f0f0", fg="#333")
logo_label.pack()

slogan_label = tk.Label(logo_frame, text="Your daily journaling companion", font=("Helvetica", 14), bg="#f0f0f0", fg="#666")
slogan_label.pack()

# Notebook widget
notebook = ttk.Notebook(root)
notebook.place(relx=0.5, rely=0.5, anchor=tk.CENTER)

# Entry Tab
entry_tab = tk.Frame(notebook, bg="#f0f0f0")
notebook.add(entry_tab, text="New Entry", padding=20)

entry_label = tk.Label(entry_tab, text="Today's Thoughts:", font=("Helvetica", 12), bg="#f0f0f0")
entry_label.pack()
entry = tk.Text(entry_tab, height=10, width=50, font=("Helvetica", 10), bg="#f0f0f0")
entry.pack()

save_button = tk.Button(entry_tab, text="Save Entry", command=save_entry, font=("Helvetica", 10, "bold"), bg="#008CBA", fg="#fff", padx=10, pady=5)
save_button.pack(pady=10)

# Entries Tab
entries_tab = ttk.Notebook(notebook)
notebook.add(entries_tab, text="All Entries", padding=20)
update_entries()

# Exit Button
exit_button = tk.Button(root, text="Exit", command=root.destroy, font=("Helvetica", 12), bg="#ff0000", fg="#fff", padx=10, pady=5)
exit_button.place(relx=0.5, rely=0.95, anchor=tk.CENTER)

# Run the main GUI
root.mainloop()
