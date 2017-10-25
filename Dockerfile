FROM python:3.5

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

ADD static /usr/src/app/static
ADD templates /usr/src/app/templates
COPY api.py .

EXPOSE 5000
