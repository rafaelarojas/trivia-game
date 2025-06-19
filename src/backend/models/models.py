from pydantic import BaseModel

class Score(BaseModel):
    player: str
    score: int
    hearts_used: int
