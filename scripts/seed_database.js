import { loadLibrary } from "../src/save_load_manager.js";
import { saveToLibraryDb } from "../src/database_manager.js";

const library = loadLibrary('data/library.json')
saveToLibraryDb('data/library.db', library)