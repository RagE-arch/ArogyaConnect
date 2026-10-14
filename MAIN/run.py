"""
AarogyaConnect 360 - Server Starter Script
Run using: python run.py
"""

import sys
import uvicorn

if __name__ == "__main__":
    # Ensure UTF-8 output on Windows console
    if sys.platform == "win32":
        try:
            sys.stdout.reconfigure(encoding="utf-8")
        except Exception:
            pass

    print("=" * 60)
    print("  [+] AarogyaConnect 360 - Universal Healthcare Ecosystem")
    print("  Serving: Patients | Hospitals | Immediate Family Members")
    print("  Host: http://127.0.0.1:8000")
    print("=" * 60)
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=False)
