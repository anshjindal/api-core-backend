#!/bin/bash

# Reset the remote origin to GitHub and add Gitea
git remote remove origin
git remote add origin https://github.com/anshjindal/api-core-backend
git remote set-url --add origin https://gitea.wouessi.com/Wouessi/api-core-backend.git

echo "Remotes configured. Git will now push to GitHub first, then Gitea."
