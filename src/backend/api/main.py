from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import scores_table
from models import Score
from tinydb import Query

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/scores")
def get_scores():
    return scores_table.all()

@app.post("/score")
def save_score(score: Score):
    Player = Query()
    existing = scores_table.get(Player.player == score.player)
    if existing:
        scores_table.update(score.dict(), Player.player == score.player)
    else:
        scores_table.insert(score.dict())
    return {"status": "ok"}
