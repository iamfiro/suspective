from fastapi import HTTPException
import os

directory = "save_directory"

path_dict = {"story": "story.json", "suspect1": "suspect1.json", "suspect2": "suspect2.json"}

def get_path(name : str):
    """
    :param name: story, suspect1, suspect2
    :return: str
    """
    try:
        return os.path.join(directory, path_dict[name])
    except KeyError as error:
        raise HTTPException(status_code=500, detail=str(error))
