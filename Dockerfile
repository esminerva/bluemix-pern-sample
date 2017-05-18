FROM ibmcom/ibmnode

	ADD . /app

	ENV PORT 8080

	EXPOSE 8080

	WORKDIR "/app"

	CMD ["npm", "start", "NODE_ENV=production"]
