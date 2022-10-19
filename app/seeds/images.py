from app.models import db, Image

def seed_images():

    image1 = Image(
        user_id = 1,
        business_id = 1,
        url = 'https://zhihong-capstone.s3.amazonaws.com/7c06cdf7a8534574b1e1f65b43f4f872.jpg'
    )
    image2 = Image(
        user_id = 1,
        business_id = 1,
        url = 'https://zhihong-capstone.s3.amazonaws.com/0f2115f0c08d459bae19be8b1fb3b5ee.jpg'
    )
    image3 = Image(
        user_id = 1,
        business_id = 1,
        url = 'https://zhihong-capstone.s3.amazonaws.com/7d97f96bad014e36b13eb699528ea5e9.jpg'
    )
    image4 = Image(
        user_id = 1,
        business_id = 2,
        url = 'https://zhihong-capstone.s3.amazonaws.com/3d88ffba077e44769cf43f74e6bd7384.jpg'
    )
    image5 = Image(
        user_id = 2,
        business_id = 3,
        url = 'https://zhihong-capstone.s3.amazonaws.com/af840ef32eae436fbde24648da955926.jpg'
    )
    image6 = Image(
        user_id = 2,
        business_id = 3,
        url = 'https://zhihong-capstone.s3.amazonaws.com/8be90ff3971a4d6ea99bf123a8ae763f.jpg'
    )
    image7 = Image(
        user_id = 2,
        business_id = 3,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976443/2_qval3f.jpg'
    )
    image8 = Image(
        user_id = 2,
        business_id = 4,
        url = 'https://zhihong-capstone.s3.amazonaws.com/7aa2a396cf7249fdaa2f22a41f665add.jpg'
    )
    image9 = Image(
        user_id = 2,
        business_id = 4,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976443/1_vntcop.jpg'
    )
    image10 = Image(
        user_id = 3,
        business_id = 5,
        url = 'https://zhihong-capstone.s3.amazonaws.com/4a81d6c2cead46c19f11030c57737fd6.jpg'
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
        url = 'https://zhihong-capstone.s3.amazonaws.com/83105b61ed364bd0b4ddfc6364550c3e.jpg'
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
        url = 'https://zhihong-capstone.s3.amazonaws.com/263580a69e214d06b5b474d5104317ab.jpg'
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
        url = 'https://zhihong-capstone.s3.amazonaws.com/d25fa7e480c64fe78f7f051c18d65645.jpg'
    )
    image20 = Image(
        user_id = 6,
        business_id = 8,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976916/seafood-1_mvyeti.jpg'
    )
    image21 = Image(
        user_id = 6,
        business_id = 9,
        url = 'https://zhihong-capstone.s3.amazonaws.com/d6329da723cf42d69285b391fbd3c957.jpg'
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
        url = 'https://zhihong-capstone.s3.amazonaws.com/e92ff295b8bf40c08296129e4f3ffd1b.jpg'
    )
    image25 = Image(
        user_id = 7,
        business_id = 10,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976443/2_qval3f.jpg'
    )
    image26 = Image(
        user_id = 7,
        business_id = 11,
        url = 'https://zhihong-capstone.s3.amazonaws.com/e4e94073cca847b5b564fd920161a19a.jpg'
    )
    image27 = Image(
        user_id = 7,
        business_id = 11,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976443/2_qval3f.jpg'
    )
    image28 = Image(
        user_id = 8,
        business_id = 12,
        url = 'https://zhihong-capstone.s3.amazonaws.com/5dd06cb9381347e8bb9841fa103811f1.jpg'
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
        url = 'https://zhihong-capstone.s3.amazonaws.com/20209a58756b4e01884d3b4f7b47de25.jpg'
    )
    image32 = Image(
        user_id = 8,
        business_id = 13,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661977753/crab-2_fbsqyg.jpg'
    )
    image33 = Image(
        user_id = 9,
        business_id = 14,
        url = 'https://zhihong-capstone.s3.amazonaws.com/d789137697324a04a40d6e1343ef487b.jpg'
    )
    image34 = Image(
        user_id = 9,
        business_id = 14,
        url = 'https://res.cloudinary.com/zhihongliu/image/upload/v1661976915/ice-cream_-2_ygshkm.jpg'
    )
    image35 = Image(
        user_id = 9,
        business_id = 15,
        url = 'https://zhihong-capstone.s3.amazonaws.com/da7a2feb499b49b5a5430fef50cb9d99.jpg'
    )
    image36 = Image(
        user_id = 10,
        business_id = 16,
        url = 'https://zhihong-capstone.s3.amazonaws.com/c9343ceb424444e7a254cd186a8f9703.jpg'
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
