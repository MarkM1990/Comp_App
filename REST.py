from flask import Flask, request, jsonify
import mysql.connector
from flask_basicauth import BasicAuth
from flask_cors import CORS
from datetime import datetime

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="your.password.here",
    database="your.database.here"
)

app = Flask(__name__)

CORS(app)

#Kundenbeanstandung erfassen
@app.route('/KBeanstandungen-erf', methods=['POST'])
def insert_data1():
    try:
        data = request.get_json()
        if 'Date' in data and 'Kunde' in data and 'Teilenummer' in data and 'Teilebezeichnung' in data and 'Beanstandungsgrund' in data and 'CQA' in data and 'Details' in data:
            cursor = db.cursor()

            Date = data['Date'][:45]
            Kunde = data['Kunde'][:200]
            Teilenummer = data['Teilenummer'][:45]
            Teilebezeichnung = data['Teilebezeichnung'][:150]
            Beanstandungsgrund = data['Beanstandungsgrund'][:5000]
            CQA = data['CQA'][:100]
            Details = data['Details'][:5000]
            Abgeschlossen = False

            cursor.execute(
                "INSERT INTO ba1 (Date, Kunde, Teilenummer, Teilebezeichnung, Beanstandungsgrund, CQA, Details, Abgeschlossen)"
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (Date, Kunde, Teilenummer, Teilebezeichnung, Beanstandungsgrund, CQA, Details, Abgeschlossen)
            )
            db.commit()
            cursor.close()
            return jsonify({"message": "Daten wurden erfolgreich eingefügt oder angepasst."}), 200
        else:
            return jsonify({"error": "(Date, Kunde, Teilenummer, Teilebezeichnung, Beanstandungsgrund CQA und Details müssen im Anfragekörper vorhanden sein."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#Lieferantenbeanstandung erfassen
@app.route('/LBeanstandungen-erf', methods=['POST'])
def insert_data2():
    try:
        data = request.get_json()
        if 'Date' in data and 'Lieferant' in data and 'Teilenummer' in data and 'Teilebezeichnung' in data and 'Beanstandungsgrund' in data and 'SQA' in data and 'Details' in data:
            cursor = db.cursor()

            Date = data['Date'][:45]
            Lieferant = data['Lieferant'][:200]
            Teilenummer = data['Teilenummer'][:45]
            Teilebezeichnung = data['Teilebezeichnung'][:150]
            Beanstandungsgrund = data['Beanstandungsgrund'][:5000]
            SQA = data['SQA'][:100]
            Details = data['Details'][:5000]
            Abgeschlossen = False

            cursor.execute(
                "INSERT INTO la1 (Date, Lieferant, Teilenummer, Teilebezeichnung, Beanstandungsgrund, SQA, Details, Abgeschlossen)"
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (Date, Lieferant, Teilenummer, Teilebezeichnung, Beanstandungsgrund, SQA, Details, Abgeschlossen)
            )
            db.commit()
            cursor.close()
            return jsonify({"message": "Daten wurden erfolgreich eingefügt oder angepasst."}), 200
        else:
            return jsonify({"error": "(Date, Lieferant, Teilenummer, Teilebezeichnung, Beanstandungsgrund, SQA und Details müssen im Anfragekörper vorhanden sein."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#Kundenbeanstandungen abfragen
@app.route('/KBeanstandunge-abf', methods=['GET'])
def get_data1():
    cursor = db.cursor()
    cursor.execute("SELECT ID, Date, Kunde, Teilenummer, Teilebezeichnung, Beanstandungsgrund, CQA, Abgeschlossen FROM ba1")
    result = cursor.fetchall()
    cursor.close()
    data = [{"ID": row[0], "Date": row[1], "Kunde": row[2], "Teilenummer": row[3], "Teilebezeichnung": row[4], "Beanstandungsgrund": row[5], "CQA": row[6], "Abgeschlossen": bool(row[7])} for row in result]
    return jsonify(data), 200


#Lieferantenbeanstandungen abfragen
@app.route('/LBeanstandunge-abf', methods=['GET'])
def get_data2():
    cursor = db.cursor()
    cursor.execute("SELECT ID, Date, Lieferant, Teilenummer, Teilebezeichnung, Beanstandungsgrund, SQA, Abgeschlossen FROM la1")
    result = cursor.fetchall()
    cursor.close()
    data = [{"ID": row[0], "Date": row[1], "Lieferant": row[2], "Teilenummer": row[3], "Teilebezeichnung": row[4], "Beanstandungsgrund": row[5], "SQA": row[6], "Abgeschlossen": bool(row[7])} for row in result] 
    return jsonify(data), 200

@app.route('/KBeanstandunge-abf/anp', methods=['POST'])
def get_data3():
    request_data = request.get_json()
    selectedID = request_data.get('selectedID')
    cursor = db.cursor()
    cursor.execute("SELECT ID, Date, Kunde, Teilenummer, Teilebezeichnung, Beanstandungsgrund, CQA, Abgeschlossen, Details, Kosten FROM ba1 WHERE ID = %s",(selectedID,))
    result = cursor.fetchall()
    cursor.close()
    data = [{"ID": row[0], "Date": row[1], "Kunde": row[2], "Teilenummer": row[3], "Teilebezeichnung": row[4], "Beanstandungsgrund": row[5], "CQA": row[6], "Abgeschlossen": bool(row[7]), "Details": row[8], "Kosten": row[9]} for row in result]
    return jsonify(data), 200

#Lieferantenbeanstandungen abfragen
@app.route('/LBeanstandunge-abf/anp', methods=['POST'])
def get_data4():
    request_data = request.get_json()
    selectedID = request_data.get('selectedID')
    cursor = db.cursor()
    cursor.execute("SELECT ID, Date, Lieferant, Teilenummer, Teilebezeichnung, Beanstandungsgrund, SQA, Abgeschlossen, Details, Kosten FROM la1 WHERE ID = %s",(selectedID,))
    result = cursor.fetchall()
    cursor.close()
    data = [{"ID": row[0], "Date": row[1], "Lieferant": row[2], "Teilenummer": row[3], "Teilebezeichnung": row[4], "Beanstandungsgrund": row[5], "SQA": row[6], "Abgeschlossen": bool(row[7]), "Details": row[8], "Kosten": row[9]} for row in result]
    return jsonify(data), 200

#Kundenbeanstandung bearbeiten
@app.route('/KBeanstandungen-anp', methods=['POST'])
def post_data1():
    try:
        data = request.get_json()
        if 'Date' in data and 'Kunde' in data and 'Teilenummer' in data and 'Teilebezeichnung' in data and 'Beanstandungsgrund' in data and 'CQA' in data and 'Details' in data and 'Kosten' in data and 'Abgeschlossen' in data and 'ID' in data:
            cursor = db.cursor()

            ID = data['ID']
            Date = data['Date'][:45]
            Kunde = data['Kunde'][:200]
            Teilenummer = data['Teilenummer'][:45]
            Teilebezeichnung = data['Teilebezeichnung'][:150]
            Beanstandungsgrund = data['Beanstandungsgrund'][:5000]
            CQA = data['CQA'][:100]
            Details = data['Details'][:5000]
            Kosten = data['Kosten']
            Abgeschlossen = data['Abgeschlossen']

            cursor.execute(
                "UPDATE ba1 SET Date=%s, Kunde=%s, Teilenummer=%s, Teilebezeichnung=%s, Beanstandungsgrund=%s, CQA=%s, Details=%s, Kosten=%s ,Abgeschlossen=%s WHERE ID = %s",
                (Date, Kunde, Teilenummer, Teilebezeichnung, Beanstandungsgrund, CQA, Details, Kosten, Abgeschlossen, ID)
            )
            db.commit()
            cursor.close()
            return jsonify({"message": "Daten wurden erfolgreich eingefügt oder angepasst."}), 200
        else:
            return jsonify({"error": "(Date, Kunde, Teilenummer, Teilebezeichnung, Beanstandungsgrund CQA und Details müssen im Anfragekörper vorhanden sein."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

#Lieferantenbeanstandung bearbeiten
@app.route('/LBeanstandungen-anp', methods=['POST'])
def post_data2():
    try:
        data = request.get_json()
        if 'Date' in data and 'Lieferant' in data and 'Teilenummer' in data and 'Teilebezeichnung' in data and 'Beanstandungsgrund' in data and 'SQA' in data and 'Details' in data and 'Kosten' in data and 'Abgeschlossen' in data and 'ID' in data:
            cursor = db.cursor()

            ID = data['ID']
            Date = data['Date'][:45]
            Lieferant = data['Lieferant'][:200]
            Teilenummer = data['Teilenummer'][:45]
            Teilebezeichnung = data['Teilebezeichnung'][:150]
            Beanstandungsgrund = data['Beanstandungsgrund'][:5000]
            SQA = data['SQA'][:100]
            Details = data['Details'][:5000]
            Kosten = data['Kosten']
            Abgeschlossen = data['Abgeschlossen']

            cursor.execute(
                "UPDATE la1 SET Date=%s, Lieferant=%s, Teilenummer=%s, Teilebezeichnung=%s, Beanstandungsgrund=%s, SQA=%s, Details=%s, Kosten=%s ,Abgeschlossen=%s WHERE ID = %s",
                (Date, Lieferant, Teilenummer, Teilebezeichnung, Beanstandungsgrund, SQA, Details, Kosten, Abgeschlossen, ID)
            )
            db.commit()
            cursor.close()
            return jsonify({"message": "Daten wurden erfolgreich eingefügt oder angepasst."}), 200
        else:
            return jsonify({"error": "(Date, Kunde, Teilenummer, Teilebezeichnung, Beanstandungsgrund CQA und Details müssen im Anfragekörper vorhanden sein."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True, port=5000)
