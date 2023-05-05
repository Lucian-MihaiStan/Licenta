FROM python:3.6.9
COPY requirements.txt /tmp
COPY /src /app
RUN pip install -U setuptools
RUN pip install -r /tmp/requirements.txt
WORKDIR /app
EXPOSE 5002
CMD ["python", "-u", "mongo_service.py"]