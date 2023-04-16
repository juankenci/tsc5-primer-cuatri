FROM postgres:9.4

ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_USER=postgres

# Expose the PostgreSQL port
EXPOSE 5432
 
# Add VOLUMEs to allow backup of config, logs and databases
VOLUME  ["$HOME/pgvol"]
 
# Set the default command to run when starting the container
CMD ["postgres"]