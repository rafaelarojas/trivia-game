from tinydb import TinyDB

db = TinyDB("tinydb.json")
scores_table = db.table("scores")
