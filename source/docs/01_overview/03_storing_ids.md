# Storing IDs

You can safely assume resource IDs we generate will never exceed 255 characters, but you should be able to handle IDs of up to that length.

If for example you’re using MySQL, you should store IDs in a VARCHAR(255) COLLATE utf8_bin column (the COLLATE configuration ensures case-sensitivity in lookups).
