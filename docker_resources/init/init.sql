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

select
    setval('departments_id_seq', 2);

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
    (
        1,
        '齊藤　辰彦',
        1,
        'tatsuhiko_saito',
        '{bcrypt}$2a$10$cCrBSpVo5n9QNveU9OSIe.ed8jLDag197X5wRtgcO/izapwNNuM4O'
    ),
    (
        2,
        '竹内　祐介',
        2,
        'yusuke_takeuchi',
        '{bcrypt}$2a$10$Qam2ywSdBcvFm79XJl6e0e7PVRN5GES5V.c/DFEfGN2URSbMk8KlS'
    );

select
    setval('users_id_seq', 2);

CREATE TABLE IF NOT EXISTS holidays(
    id SERIAL,
    name text,
    PRIMARY KEY (id)
);

INSERT into
    holidays (id, name)
VALUES
    (0, null),
    (1, '有給'),
    (2, 'フレキシブル休暇'),
    (3, 'アニバーサリー休暇'),
    (4, '忌引き（無給）');

-- select setval('holidays_id_seq', 2);
------------------------------
-- attendancesリセット
------------------------------
DROP TABLE IF EXISTS attendances;

CREATE TABLE IF NOT EXISTS attendances(
    id SERIAL,
    user_id integer,
    holiday_id integer,
    year integer,
    month integer,
    day integer,
    start_time varchar(4),
    end_time varchar(4),
    break_time varchar(4),
    is_entered boolean,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (holiday_id) REFERENCES holidays (id)
);

-- attendances ダミーデータ作成
\set START_DATE '2023-12-01';

-- DECLARE START_DATE := '2023-12-01';
INSERT INTO
    attendances (
        user_id,
        holiday_id,
        year,
        month,
        day,
        start_time,
        end_time,
        break_time,
        is_entered
    )
SELECT
    u.id as user_id,
    1 as holyday_id,
    EXTRACT(
        year
        FROM
            timestamp :'START_DATE' + d.day * interval '1 day' + (random() * 3 * interval '1 hour') + interval '8 hours'
    ) as year,
    EXTRACT(
        month
        FROM
            timestamp :'START_DATE' + d.day * interval '1 day' + (random() * 3 * interval '1 hour') + interval '8 hours'
    ) as month,
    EXTRACT(
        day
        FROM
            timestamp :'START_DATE' + d.day * interval '1 day' + (random() * 3 * interval '1 hour') + interval '8 hours'
    ) as day,
    to_char(
        (
            timestamp :'START_DATE' + d.day * interval '1 day' + (random() * 3 * interval '1 hour') + interval '8 hours'
        ) :: time,
        'HH24MI'
    ) as start_time,
    to_char(
        (
            timestamp :'START_DATE' + d.day * interval '1 day' + (random() * 3 * interval '1 hour') + interval '17 hours'
        ) :: time,
        'HH24MI'
    ) as end_time,
    CASE
        WHEN random() < 0.5 THEN '0100'
        ELSE '0130'
    END as break_time,
    true as is_entered
FROM
    generate_series(1, 60) as d(day) -- INNER JOIN generate_series(11, 12) m(month) ON month = m
    CROSS JOIN users u
    INNER JOIN holidays h ON h.id = 1;

select
    setval('users_id_seq', 2);