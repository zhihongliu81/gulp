from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='Demo', email='demo@aa.io', password='password')
    marnie = User(
        first_name='Marnie', last_name='Marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        first_name='Bobbie', last_name='Bobbie', email='bobbie@aa.io', password='password')
    emma = User(
        first_name='Emma', last_name='Emma', email='emma@aa.io', password='password')
    eva = User(
        first_name='Eva', last_name='eva', email='eva@aa.io', password='password')
    leo = User(
        first_name='Leo', last_name='Leo', email='leo@aa.io', password='password')
    luca = User(
        first_name='Luca', last_name='Luca', email='luca@aa.io', password='password')
    jack = User(
        first_name='Jack', last_name='Jack', email='jack@aa.io', password='password')
    nora = User(
        first_name='Nora', last_name='Nora', email='nora@aa.io', password='password')
    elias = User(
        first_name='Elias', last_name='Elias', email='elias@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(emma)
    db.session.add(eva)
    db.session.add(leo)
    db.session.add(luca)
    db.session.add(jack)
    db.session.add(nora)
    db.session.add(elias)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
