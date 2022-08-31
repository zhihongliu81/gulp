from app.models import db, Image

def seed_images():

    image1 = Image(
        user_id = 1,
        business_id = 1,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976443/1_vntcop.jpg'
    )
    image2 = Image(
        user_id = 1,
        business_id = 1,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976915/steakhouse-1_lgbqxy.jpg'
    )
    image3 = Image(
        user_id = 1,
        business_id = 1,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976915/steakhouse-2_oxmazi.jpg'
    )
    image4 = Image(
        user_id = 1,
        business_id = 2,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976915/steakhouse-2_oxmazi.jpg'
    )
    image5 = Image(
        user_id = 2,
        business_id = 3,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976916/seafood-1_mvyeti.jpg'
    )
    image6 = Image(
        user_id = 2,
        business_id = 3,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976915/seafood-2_bgvzm6.jpg'
    )
    image7 = Image(
        user_id = 2,
        business_id = 3,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976443/2_qval3f.jpg'
    )
    image8 = Image(
        user_id = 2,
        business_id = 4,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976915/steakhouse-2_oxmazi.jpg'
    )
    image9 = Image(
        user_id = 2,
        business_id = 4,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976443/1_vntcop.jpg'
    )
    image10 = Image(
        user_id = 3,
        business_id = 5,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976916/ice-cream_-1_q0pupm.jpg'
    )
    image11 = Image(
        user_id = 3,
        business_id = 5,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976915/ice-cream_-2_ygshkm.jpg'
    )
    image12 = Image(
        user_id = 3,
        business_id = 5,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976443/3_kjbtci.jpg'
    )
    image13 = Image(
        user_id = 4,
        business_id = 6,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976443/3_kjbtci.jpg'
    )
    image14 = Image(
        user_id = 4,
        business_id = 6,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976916/ice-cream_-1_q0pupm.jpg'
    )
    image15 = Image(
        user_id = 4,
        business_id = 6,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976915/ice-cream_-2_ygshkm.jpg'
    )
    image16 = Image(
        user_id = 5,
        business_id = 7,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976915/ice-cream_-2_ygshkm.jpg'
    )
    image17 = Image(
        user_id = 5,
        business_id = 7,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976916/ice-cream_-1_q0pupm.jpg'
    )
    image18 = Image(
        user_id = 5,
        business_id = 7,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976443/3_kjbtci.jpg'
    )
    image19 = Image(
        user_id = 6,
        business_id = 8,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976916/seafood-1_mvyeti.jpg'
    )
    image20 = Image(
        user_id = 6,
        business_id = 8,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976915/steakhouse-2_oxmazi.jpg'
    )
    image21 = Image(
        user_id = 6,
        business_id = 9,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976443/2_qval3f.jpg'
    )
    image22 = Image(
        user_id = 6,
        business_id = 9,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976915/seafood-2_bgvzm6.jpg'
    )
    image23 = Image(
        user_id = 6,
        business_id = 9,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976916/seafood-1_mvyeti.jpg'
    )
    image24 = Image(
        user_id = 7,
        business_id = 10,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976916/seafood-1_mvyeti.jpg'
    )
    image25 = Image(
        user_id = 7,
        business_id = 10,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976443/2_qval3f.jpg'
    )
    image26 = Image(
        user_id = 7,
        business_id = 11,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976916/seafood-1_mvyeti.jpg'
    )
    image27 = Image(
        user_id = 7,
        business_id = 11,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976443/2_qval3f.jpg'
    )
    image28 = Image(
        user_id = 8,
        business_id = 12,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661977753/crab-1_kqdtbl.jpg'
    )
    image29 = Image(
        user_id = 8,
        business_id = 12,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661977753/crab-2_fbsqyg.jpg'
    )
    image30 = Image(
        user_id = 8,
        business_id = 12,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661977753/crab-3_utpxhs.jpg'
    )
    image31 = Image(
        user_id = 8,
        business_id = 13,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661977753/crab-3_utpxhs.jpg'
    )
    image32 = Image(
        user_id = 8,
        business_id = 13,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661977753/crab-2_fbsqyg.jpg'
    )
    image33 = Image(
        user_id = 9,
        business_id = 14,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976443/3_kjbtci.jpg'
    )
    image34 = Image(
        user_id = 9,
        business_id = 14,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976915/ice-cream_-2_ygshkm.jpg'
    )
    image35 = Image(
        user_id = 9,
        business_id = 15,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976443/2_qval3f.jpg'
    )
    image36 = Image(
        user_id = 10,
        business_id = 16,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976915/steakhouse-1_lgbqxy.jpg'
    )


    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)
    db.session.add(image7)
    db.session.add(image8)
    db.session.add(image9)
    db.session.add(image10)
    db.session.add(image11)
    db.session.add(image12)
    db.session.add(image13)
    db.session.add(image14)
    db.session.add(image15)
    db.session.add(image16)
    db.session.add(image17)
    db.session.add(image18)
    db.session.add(image19)
    db.session.add(image20)
    db.session.add(image21)
    db.session.add(image22)
    db.session.add(image23)
    db.session.add(image24)
    db.session.add(image25)
    db.session.add(image26)
    db.session.add(image27)
    db.session.add(image28)
    db.session.add(image29)
    db.session.add(image30)
    db.session.add(image31)
    db.session.add(image32)
    db.session.add(image33)
    db.session.add(image34)
    db.session.add(image35)
    db.session.add(image36)

    db.session.commit()




def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
