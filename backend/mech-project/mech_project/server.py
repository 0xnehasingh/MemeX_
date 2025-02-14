# backend/mech-project/mech_project/server.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
import logging
from mech_client.interact import interact  # Import the regular interact function
import os
import traceback

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Update CORS middleware with more specific settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

def load_private_key():
    key_path = os.path.join(os.path.dirname(__file__), '..', 'ethereum_private_key.txt')
    try:
        with open(key_path, 'r') as f:
            return f.read().strip()
    except Exception as e:
        logger.error(f"Failed to load private key: {e}")
        return None

# Add this before creating the FastAPI app
os.environ['WALLET_PRIVATE_KEY'] = load_private_key() or os.getenv('WALLET_PRIVATE_KEY', '')

class MechRequest(BaseModel):
    prompt: str
    agent_id: int
    tool: Optional[str] = None

async def async_interact_wrapper(**kwargs):
    """Wrapper to make the synchronous interact function work asynchronously"""
    import asyncio
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(None, lambda: interact(**kwargs))

# Custom error response class
class ErrorResponse(JSONResponse):
    def __init__(self, content: dict, status_code: int = 400):
        super().__init__(
            content=content,
            status_code=status_code
        )

@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request, exc):
    return ErrorResponse(
        content={"detail": str(exc.detail)},
        status_code=exc.status_code
    )

@app.post("/api/mech")
async def process_mech_request(request: MechRequest):
    try:
        logger.info(f"Received request: {request}")
        result = await async_interact_wrapper(
            prompt=request.prompt,
            agent_id=request.agent_id,
            tool=request.tool
        )
        logger.info(f"Interact result: {result}")
        
        if result is None:
            logger.error("Result is None - raising HTTP 400")
            return ErrorResponse(
                content={"detail": "Unable to process request - insufficient funds for gas fees"},
                status_code=400
            )
            
        if isinstance(result, dict):
            return {"result": result.get("result", "No result returned")}
        else:
            return {"result": str(result)}
            
    except Exception as e:
        error_message = str(e)
        
        if "insufficient funds" in error_message.lower():
            error_message = "Insufficient funds to pay for gas fees. Please add funds to your wallet."
        
        logger.error(f"Error processing request: {error_message}")
        logger.error(f"Full traceback: {traceback.format_exc()}")
        
        return ErrorResponse(
            content={"detail": error_message},
            status_code=400
        )

@app.get("/test")
async def test_endpoint():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("mech_project.server:app", host="0.0.0.0", port=8000, reload=True)