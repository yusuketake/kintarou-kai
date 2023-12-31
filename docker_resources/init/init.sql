CREATE DATABASE kintarou;

\c kintarou;

CREATE TABLE IF NOT EXISTS departments(
    id SERIAL,
    name text,
    PRIMARY KEY (id)
);

INSERT into
    departments (id, name)
VALUES
    (1, '住まいエンジニアリング部'),
    (2, 'SRE部');

CREATE TABLE IF NOT EXISTS users(
    id SERIAL,
    name text,
    department_id integer,
    login_id text,
    password text,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES departments (id)
);

INSERT into
    users (id, name, department_id, login_id, password)
VALUES
    (1, '齊藤　辰彦', 1, 'tatsuhiko_saito', 'password'),
    (2, '竹内　祐介', 2, 'yusuke_takeuchi', 'password');

CREATE TABLE IF NOT EXISTS holidays(
    id SERIAL,
    name text,
    PRIMARY KEY (id)
);

INSERT into
    holidays (id, name)
VALUES
    (1, '有給'),
    (2, 'フレキシブル休暇'),
    (3, 'アニバーサリー休暇'),
    (4, '忌引き（無給）');


CREATE TABLE IF NOT EXISTS attendances(
    id SERIAL,
    user_id integer,
    holiday_id integer,
    year integer,
    month integer,
    day integer,
    start_time varchar(4),
    end_time varchar(4),
    is_entered boolean,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (holiday_id) REFERENCES holidays (id)
);