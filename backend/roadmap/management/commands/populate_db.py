from django.core.management.base import BaseCommand
from roadmap.models import Skill, Resource

class Command(BaseCommand):
    help = 'Populate the database with a comprehensive set of skills, prerequisites, resources, and quizzes.'

    def handle(self, *args, **options):
        # Clear all skills/resources for all domains first
        Skill.objects.filter(category__in=["Web", "Python", "Java", "DSA", "ML", "Android"]).delete()

        # --- Web Development Skill Tree ---
        Skill.objects.filter(category="Web").delete()
        Resource.objects.filter(skill__category="Web").delete()
        # 1. Create all Web skills
        web_html = Skill.objects.create(
            name="HTML",
            description="Hypertext Markup Language, structure and syntax.",
            difficulty_level=1,
            estimated_time=2,
            category="Web"
        )
        web_css = Skill.objects.create(
            name="CSS",
            description="Cascading Style Sheets, styling and layout.",
            difficulty_level=1,
            estimated_time=2,
            category="Web"
        )
        web_javascript = Skill.objects.create(
            name="JavaScript",
            description="Client-side scripting language, dynamic content.",
            difficulty_level=1,
            estimated_time=2,
            category="Web"
        )
        web_bootstrap = Skill.objects.create(
            name="Bootstrap",
            description="Front-end framework for developing responsive websites.",
            difficulty_level=1,
            estimated_time=2,
            category="Web"
        )
        web_react = Skill.objects.create(
            name="React",
            description="JavaScript library for building user interfaces.",
            difficulty_level=2,
            estimated_time=2,
            category="Web"
        )
        web_nodejs = Skill.objects.create(
            name="Node.js",
            description="JavaScript runtime environment for server-side applications.",
            difficulty_level=2,
            estimated_time=2,
            category="Web"
        )
        web_express = Skill.objects.create(
            name="Express",
            description="Web application framework for Node.js.",
            difficulty_level=2,
            estimated_time=2,
            category="Web"
        )
        web_django = Skill.objects.create(
            name="Django",
            description="Python-based web framework, rapid development.",
            difficulty_level=2,
            estimated_time=2,
            category="Web"
        )
        web_flask = Skill.objects.create(
            name="Flask",
            description="Python micro web framework, lightweight and flexible.",
            difficulty_level=2,
            estimated_time=2,
            category="Web"
        )
        web_php = Skill.objects.create(
            name="PHP",
            description="Server-side scripting language for web development.",
            difficulty_level=2,
            estimated_time=2,
            category="Web"
        )
        web_sql = Skill.objects.create(
            name="SQL",
            description="Structured Query Language, managing relational databases.",
            difficulty_level=2,
            estimated_time=2,
            category="Web"
        )
        web_api = Skill.objects.create(
            name="API Development",
            description="Building and consuming APIs, RESTful principles.",
            difficulty_level=2,
            estimated_time=2,
            category="Web"
        )
        web_seo = Skill.objects.create(
            name="SEO",
            description="Search Engine Optimization, improving website visibility.",
            difficulty_level=2,
            estimated_time=2,
            category="Web"
        )
        web_ux = Skill.objects.create(
            name="UX Design",
            description="User Experience design principles and techniques.",
            difficulty_level=2,
            estimated_time=2,
            category="Web"
        )
        # Prerequisites
        web_css.prerequisites.add(web_html)
        web_javascript.prerequisites.add(web_css)
        web_bootstrap.prerequisites.add(web_javascript)
        web_react.prerequisites.add(web_bootstrap)
        web_nodejs.prerequisites.add(web_react)
        web_express.prerequisites.add(web_nodejs)
        web_django.prerequisites.add(web_express)
        web_flask.prerequisites.add(web_django)
        web_php.prerequisites.add(web_flask)
        web_sql.prerequisites.add(web_php)
        web_api.prerequisites.add(web_sql)
        web_seo.prerequisites.add(web_api)
        web_ux.prerequisites.add(web_seo)
        # 2. Create all Web resources
        html_article = Resource.objects.create(
            title="HTML Crash Course (Article)",
            url="https://www.geeksforgeeks.org/html/",
            resource_type="article",
            difficulty_level=1,
            estimated_time=1
        )
        html_video = Resource.objects.create(
            title="HTML Tutorial (Video)",
            url="https://www.youtube.com/watch?v=qz0aGYrrlhU",
            resource_type="video",
            difficulty_level=1,
            estimated_time=2
        )
        html_course = Resource.objects.create(
            title="HTML Full Course (Course)",
            url="https://www.udemy.com/course/html-css-for-beginners/",
            resource_type="course",
            difficulty_level=1,
            estimated_time=10
        )
        html_book = Resource.objects.create(
            title="Head First HTML (Book)",
            url="https://www.amazon.com/Head-First-HTML-Kathy-Sierra/dp/0596009208",
            resource_type="book",
            difficulty_level=1,
            estimated_time=8
        )
        css_article = Resource.objects.create(
            title="CSS Tutorial (Article)",
            url="https://www.w3schools.com/css/",
            resource_type="article",
            difficulty_level=1,
            estimated_time=1
        )
        css_video = Resource.objects.create(
            title="CSS Crash Course (Video)",
            url="https://www.youtube.com/watch?v=yfoY53QXEnI",
            resource_type="video",
            difficulty_level=1,
            estimated_time=2
        )
        css_course = Resource.objects.create(
            title="CSS - The Complete Guide (Course)",
            url="https://www.udemy.com/course/css-the-complete-guide-incl-flexbox-grid-sass/",
            resource_type="course",
            difficulty_level=1,
            estimated_time=8
        )
        css_book = Resource.objects.create(
            title="CSS: The Missing Manual (Book)",
            url="https://www.amazon.com/CSS-Missing-Manual-David-Sawyer/dp/0596802447/",
            resource_type="book",
            difficulty_level=1,
            estimated_time=7
        )
        js_article = Resource.objects.create(
            title="JavaScript Fundamentals (Article)",
            url="https://javascript.info/first-steps",
            resource_type="article",
            difficulty_level=1,
            estimated_time=1
        )
        js_video = Resource.objects.create(
            title="JavaScript Crash Course (Video)",
            url="https://www.youtube.com/watch?v=PkZNo7MFNFg",
            resource_type="video",
            difficulty_level=1,
            estimated_time=2
        )
        js_course = Resource.objects.create(
            title="JavaScript: Understanding the Weird Parts (Course)",
            url="https://www.udemy.com/course/understand-javascript/",
            resource_type="course",
            difficulty_level=1,
            estimated_time=12
        )
        js_book = Resource.objects.create(
            title="Eloquent JavaScript (Book)",
            url="https://eloquentjavascript.net/",
            resource_type="book",
            difficulty_level=1,
            estimated_time=10
        )
        bootstrap_article = Resource.objects.create(
            title="Bootstrap Documentation (Article)",
            url="https://getbootstrap.com/docs/5.3/getting-started/introduction/",
            resource_type="article",
            difficulty_level=1,
            estimated_time=1
        )
        bootstrap_video = Resource.objects.create(
            title="Bootstrap 5 Crash Course (Video)",
            url="https://www.youtube.com/watch?v=4sosXZsdy-s",
            resource_type="video",
            difficulty_level=1,
            estimated_time=2
        )
        bootstrap_course = Resource.objects.create(
            title="Bootstrap 5 From Scratch (Course)",
            url="https://www.udemy.com/course/bootstrap-5-from-scratch/",
            resource_type="course",
            difficulty_level=1,
            estimated_time=8
        )
        bootstrap_book = Resource.objects.create(
            title="Bootstrap 5 Quick Start (Book)",
            url="https://www.packtpub.com/product/bootstrap-5-quick-start-guide/9781801073447",
            resource_type="book",
            difficulty_level=1,
            estimated_time=6
        )
        react_article = Resource.objects.create(
            title="React Documentation (Article)",
            url="https://react.dev/learn",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        react_video = Resource.objects.create(
            title="React Crash Course (Video)",
            url="https://www.youtube.com/watch?v=w7ejDZ8SWv8",
            resource_type="video",
            difficulty_level=2,
            estimated_time=3
        )
        react_course = Resource.objects.create(
            title="React - The Complete Guide (Course)",
            url="https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
            resource_type="course",
            difficulty_level=2,
            estimated_time=15
        )
        react_book = Resource.objects.create(
            title="Learning React (Book)",
            url="https://www.oreilly.com/library/view/learning-react-2nd/9781492051718/",
            resource_type="book",
            difficulty_level=2,
            estimated_time=12
        )
        # 3. Link resources to their respective skills
        web_html.learning_resources.add(html_article, html_video, html_course, html_book)
        web_css.learning_resources.add(css_article, css_video, css_course, css_book)
        web_javascript.learning_resources.add(js_article, js_video, js_course, js_book)
        web_bootstrap.learning_resources.add(bootstrap_article, bootstrap_video, bootstrap_course, bootstrap_book)
        web_react.learning_resources.add(react_article, react_video, react_course, react_book)
        # Node.js Resources
        node_article = Resource.objects.create(
            title="Node.js Documentation (Article)",
            url="https://nodejs.org/en/docs/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        node_video = Resource.objects.create(
            title="Node.js Crash Course (Video)",
            url="https://www.youtube.com/watch?v=fBNz5xF-Kx4",
            resource_type="video",
            difficulty_level=2,
            estimated_time=3
        )
        node_course = Resource.objects.create(
            title="Node.js - The Complete Guide (Course)",
            url="https://www.udemy.com/course/nodejs-the-complete-guide/",
            resource_type="course",
            difficulty_level=2,
            estimated_time=15
        )
        node_book = Resource.objects.create(
            title="Node.js Design Patterns (Book)",
            url="https://www.packtpub.com/product/node-js-design-patterns-third-edition/9781839214110",
            resource_type="book",
            difficulty_level=2,
            estimated_time=12
        )

        # Express Resources
        express_article = Resource.objects.create(
            title="Express.js Documentation (Article)",
            url="https://expressjs.com/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        express_video = Resource.objects.create(
            title="Express.js Crash Course (Video)",
            url="https://www.youtube.com/watch?v=L72fhGm1tfE",
            resource_type="video",
            difficulty_level=2,
            estimated_time=3
        )
        express_course = Resource.objects.create(
            title="Express.js Masterclass (Course)",
            url="https://www.udemy.com/course/expressjs-masterclass/",
            resource_type="course",
            difficulty_level=2,
            estimated_time=12
        )
        express_book = Resource.objects.create(
            title="Express.js in Action (Book)",
            url="https://www.manning.com/books/express-in-action",
            resource_type="book",
            difficulty_level=2,
            estimated_time=10
        )

        # Django Resources
        django_article = Resource.objects.create(
            title="Django Documentation (Article)",
            url="https://docs.djangoproject.com/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        django_video = Resource.objects.create(
            title="Django Crash Course (Video)",
            url="https://www.youtube.com/watch?v=F5mRW0jo-U4",
            resource_type="video",
            difficulty_level=2,
            estimated_time=3
        )
        django_course = Resource.objects.create(
            title="Django - The Complete Guide (Course)",
            url="https://www.udemy.com/course/django-python-advanced/",
            resource_type="course",
            difficulty_level=2,
            estimated_time=15
        )
        django_book = Resource.objects.create(
            title="Django for Beginners (Book)",
            url="https://djangoforbeginners.com/",
            resource_type="book",
            difficulty_level=2,
            estimated_time=12
        )

        # Flask Resources
        flask_article = Resource.objects.create(
            title="Flask Documentation (Article)",
            url="https://flask.palletsprojects.com/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        flask_video = Resource.objects.create(
            title="Flask Crash Course (Video)",
            url="https://www.youtube.com/watch?v=Z1RJmh_OqeA",
            resource_type="video",
            difficulty_level=2,
            estimated_time=3
        )
        flask_course = Resource.objects.create(
            title="Flask Web Development (Course)",
            url="https://www.udemy.com/course/flask-web-development/",
            resource_type="course",
            difficulty_level=2,
            estimated_time=12
        )
        flask_book = Resource.objects.create(
            title="Flask Web Development (Book)",
            url="https://www.oreilly.com/library/view/flask-web-development/9781491991725/",
            resource_type="book",
            difficulty_level=2,
            estimated_time=10
        )

        # PHP Resources
        php_article = Resource.objects.create(
            title="PHP Documentation (Article)",
            url="https://www.php.net/docs.php",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        php_video = Resource.objects.create(
            title="PHP Crash Course (Video)",
            url="https://www.youtube.com/watch?v=OK_JCtrrv-c",
            resource_type="video",
            difficulty_level=2,
            estimated_time=3
        )
        php_course = Resource.objects.create(
            title="PHP for Beginners (Course)",
            url="https://www.udemy.com/course/php-for-complete-beginners-includes-msql-object-oriented/",
            resource_type="course",
            difficulty_level=2,
            estimated_time=12
        )
        php_book = Resource.objects.create(
            title="Modern PHP (Book)",
            url="https://www.oreilly.com/library/view/modern-php/9781491905173/",
            resource_type="book",
            difficulty_level=2,
            estimated_time=10
        )

        # SQL Resources
        sql_article = Resource.objects.create(
            title="SQL Tutorial (Article)",
            url="https://www.w3schools.com/sql/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        sql_video = Resource.objects.create(
            title="SQL Crash Course (Video)",
            url="https://www.youtube.com/watch?v=HXV3zeQKqGY",
            resource_type="video",
            difficulty_level=2,
            estimated_time=3
        )
        sql_course = Resource.objects.create(
            title="SQL - The Complete Guide (Course)",
            url="https://www.udemy.com/course/the-complete-sql-bootcamp/",
            resource_type="course",
            difficulty_level=2,
            estimated_time=12
        )
        sql_book = Resource.objects.create(
            title="SQL for Data Analysis (Book)",
            url="https://www.oreilly.com/library/view/sql-for-data/9781492088776/",
            resource_type="book",
            difficulty_level=2,
            estimated_time=10
        )

        # API Development Resources
        api_article = Resource.objects.create(
            title="REST API Design (Article)",
            url="https://restfulapi.net/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        api_video = Resource.objects.create(
            title="API Development Crash Course (Video)",
            url="https://www.youtube.com/watch?v=FLnxgSZ0DG4",
            resource_type="video",
            difficulty_level=2,
            estimated_time=3
        )
        api_course = Resource.objects.create(
            title="API and Web Service Introduction (Course)",
            url="https://www.udemy.com/course/api-and-web-service-introduction/",
            resource_type="course",
            difficulty_level=2,
            estimated_time=12
        )
        api_book = Resource.objects.create(
            title="API Design Patterns (Book)",
            url="https://www.manning.com/books/api-design-patterns",
            resource_type="book",
            difficulty_level=2,
            estimated_time=10
        )

        # SEO Resources
        seo_article = Resource.objects.create(
            title="SEO Starter Guide (Article)",
            url="https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        seo_video = Resource.objects.create(
            title="SEO Crash Course (Video)",
            url="https://www.youtube.com/watch?v=El3IZAFERLY",
            resource_type="video",
            difficulty_level=2,
            estimated_time=3
        )
        seo_course = Resource.objects.create(
            title="SEO Training Course (Course)",
            url="https://www.udemy.com/course/seo-training-course/",
            resource_type="course",
            difficulty_level=2,
            estimated_time=12
        )
        seo_book = Resource.objects.create(
            title="SEO 2023 (Book)",
            url="https://www.amazon.com/SEO-2023-Adam-Clarke/dp/1973331925",
            resource_type="book",
            difficulty_level=2,
            estimated_time=10
        )

        # UX Design Resources
        ux_article = Resource.objects.create(
            title="UX Design Principles (Article)",
            url="https://www.interaction-design.org/literature/topics/ux-design",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        ux_video = Resource.objects.create(
            title="UX Design Crash Course (Video)",
            url="https://www.youtube.com/watch?v=Ovj4hFxko7c",
            resource_type="video",
            difficulty_level=2,
            estimated_time=3
        )
        ux_course = Resource.objects.create(
            title="User Experience Design Fundamentals (Course)",
            url="https://www.udemy.com/course/user-experience-design-fundamentals/",
            resource_type="course",
            difficulty_level=2,
            estimated_time=12
        )
        ux_book = Resource.objects.create(
            title="Don't Make Me Think (Book)",
            url="https://www.amazon.com/Dont-Make-Think-Revisited-Usability/dp/0321965515",
            resource_type="book",
            difficulty_level=2,
            estimated_time=8
        )

        # Link remaining Web Development resources
        web_nodejs.learning_resources.add(node_article, node_video, node_course, node_book)
        web_express.learning_resources.add(express_article, express_video, express_course, express_book)
        web_django.learning_resources.add(django_article, django_video, django_course, django_book)
        web_flask.learning_resources.add(flask_article, flask_video, flask_course, flask_book)
        web_php.learning_resources.add(php_article, php_video, php_course, php_book)
        web_sql.learning_resources.add(sql_article, sql_video, sql_course, sql_book)
        web_api.learning_resources.add(api_article, api_video, api_course, api_book)
        web_seo.learning_resources.add(seo_article, seo_video, seo_course, seo_book)
        web_ux.learning_resources.add(ux_article, ux_video, ux_course, ux_book)
        # --- Master Level Skills for Web Domain ---
        web_architecture = Skill.objects.create(
            name="Web Architecture Mastery",
            description="Master advanced web architecture patterns and scalability.",
            difficulty_level=4,
            estimated_time=5,
            category="Web"
        )
        web_architecture.prerequisites.add(web_ux)

        web_security = Skill.objects.create(
            name="Web Security Mastery",
            description="Master advanced web security concepts and best practices.",
            difficulty_level=4,
            estimated_time=5,
            category="Web"
        )
        web_security.prerequisites.add(web_architecture)

        web_performance = Skill.objects.create(
            name="Web Performance Optimization (Master)",
            description="Master advanced web performance and optimization techniques.",
            difficulty_level=4,
            estimated_time=5,
            category="Web"
        )
        web_performance.prerequisites.add(web_security)

        # Resources for master skills
        web_arch_resource = Resource.objects.create(
            title="Advanced Web Architecture (Course)",
            url="https://www.pluralsight.com/courses/web-architecture-fundamentals",
            resource_type="course",
            difficulty_level=4,
            estimated_time=8
        )
        web_architecture.learning_resources.add(web_arch_resource)
        web_sec_resource = Resource.objects.create(
            title="Web Security Mastery (Article)",
            url="https://owasp.org/www-project-top-ten/",
            resource_type="article",
            difficulty_level=4,
            estimated_time=3
        )
        web_security.learning_resources.add(web_sec_resource)
        web_perf_resource = Resource.objects.create(
            title="Web Performance Optimization (Video)",
            url="https://www.youtube.com/watch?v=3QhU9jd03a0",
            resource_type="video",
            difficulty_level=4,
            estimated_time=2
        )
        web_performance.learning_resources.add(web_perf_resource)
        # --- Python Skill Tree ---
        Skill.objects.filter(category="Python").delete()
        python_syntax = Skill.objects.create(
            name="Python Syntax & Variables",
            description="Python syntax, variable declaration, data types, naming conventions.",
            difficulty_level=1,
            estimated_time=2,
            category="Python"
        )
        python_types = Skill.objects.create(
            name="Python Data Types",
            description="Primitive and reference types, type casting.",
            difficulty_level=1,
            estimated_time=2,
            category="Python"
        )
        python_operators = Skill.objects.create(
            name="Python Operators",
            description="Arithmetic, logical, comparison, assignment operators.",
            difficulty_level=1,
            estimated_time=1,
            category="Python"
        )
        python_control = Skill.objects.create(
            name="Python Control Flow",
            description="if, else, for, while, break, continue.",
            difficulty_level=1,
            estimated_time=2,
            category="Python"
        )
        python_methods = Skill.objects.create(
            name="Python Methods",
            description="Defining methods, parameters, return types, overloading.",
            difficulty_level=2,
            estimated_time=2,
            category="Python"
        )
        python_oop = Skill.objects.create(
            name="Python OOP",
            description="Classes, objects, inheritance, polymorphism, encapsulation, abstraction.",
            difficulty_level=2,
            estimated_time=3,
            category="Python"
        )
        python_collections = Skill.objects.create(
            name="Python Collections",
            description="List, Set, Dict, generics, iterators.",
            difficulty_level=2,
            estimated_time=2,
            category="Python"
        )
        python_exceptions = Skill.objects.create(
            name="Python Exception Handling",
            description="try, except, finally, raise, custom exceptions.",
            difficulty_level=2,
            estimated_time=2,
            category="Python"
        )
        python_fileio = Skill.objects.create(
            name="Python File I/O",
            description="Reading/writing files, streams, serialization.",
            difficulty_level=2,
            estimated_time=2,
            category="Python"
        )
        python_threads = Skill.objects.create(
            name="Python Threads & Concurrency",
            description="Threads, synchronization, concurrency utilities.",
            difficulty_level=3,
            estimated_time=3,
            category="Python"
        )
        python_streams = Skill.objects.create(
            name="Python Streams API",
            description="Streams, functional operations, pipelines.",
            difficulty_level=3,
            estimated_time=2,
            category="Python"
        )
        python_lambdas = Skill.objects.create(
            name="Python Lambda Expressions",
            description="Lambda syntax, functional interfaces, usage.",
            difficulty_level=3,
            estimated_time=2,
            category="Python"
        )
        python_annotations = Skill.objects.create(
            name="Python Annotations",
            description="Built-in and custom annotations, reflection.",
            difficulty_level=3,
            estimated_time=2,
            category="Python"
        )
        python_spring = Skill.objects.create(
            name="Python Spring Basics",
            description="Spring framework, dependency injection, beans, configuration.",
            difficulty_level=3,
            estimated_time=3,
            category="Python"
        )
        # Prerequisites
        python_types.prerequisites.add(python_syntax)
        python_operators.prerequisites.add(python_types)
        python_control.prerequisites.add(python_operators)
        python_methods.prerequisites.add(python_control)
        python_oop.prerequisites.add(python_methods)
        python_collections.prerequisites.add(python_oop)
        python_exceptions.prerequisites.add(python_collections)
        python_fileio.prerequisites.add(python_exceptions)
        python_threads.prerequisites.add(python_fileio)
        python_streams.prerequisites.add(python_threads)
        python_lambdas.prerequisites.add(python_streams)
        python_annotations.prerequisites.add(python_lambdas)
        python_spring.prerequisites.add(python_annotations)
        # Python Syntax Resources
        py_syntax_article = Resource.objects.create(
            title="Python Syntax Guide (Article)",
            url="https://docs.python.org/3/tutorial/index.html",
            resource_type="article",
            difficulty_level=1,
            estimated_time=2
        )
        py_syntax_video = Resource.objects.create(
            title="Python Syntax Crash Course (Video)",
            url="https://www.youtube.com/watch?v=khKv-8q7YmY",
            resource_type="video",
            difficulty_level=1,
            estimated_time=3
        )
        py_syntax_course = Resource.objects.create(
            title="Python for Beginners (Course)",
            url="https://www.udemy.com/course/python-for-beginners-learn-programming/",
            resource_type="course",
            difficulty_level=1,
            estimated_time=12
        )
        py_syntax_book = Resource.objects.create(
            title="Python Crash Course (Book)",
            url="https://www.amazon.com/Python-Crash-Course-2nd-Edition/dp/1593279280",
            resource_type="book",
            difficulty_level=1,
            estimated_time=10
        )

        # Python Data Types Resources
        py_types_article = Resource.objects.create(
            title="Python Data Types (Article)",
            url="https://www.w3schools.com/python/python_datatypes.asp",
            resource_type="article",
            difficulty_level=1,
            estimated_time=2
        )
        py_types_video = Resource.objects.create(
            title="Python Data Types Tutorial (Video)",
            url="https://www.youtube.com/watch?v=4mX0uPQx2JA",
            resource_type="video",
            difficulty_level=1,
            estimated_time=3
        )
        py_types_course = Resource.objects.create(
            title="Python Data Structures (Course)",
            url="https://www.udemy.com/course/python-data-structures-a-to-z/",
            resource_type="course",
            difficulty_level=1,
            estimated_time=10
        )
        py_types_book = Resource.objects.create(
            title="Python Data Structures and Algorithms (Book)",
            url="https://www.amazon.com/Python-Data-Structures-Algorithms-Applications/dp/3319130714",
            resource_type="book",
            difficulty_level=1,
            estimated_time=8
        )

        # Python OOP Resources
        py_oop_article = Resource.objects.create(
            title="Python OOP Tutorial (Article)",
            url="https://realpython.com/python3-object-oriented-programming/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=3
        )
        py_oop_video = Resource.objects.create(
            title="Python OOP Crash Course (Video)",
            url="https://www.youtube.com/watch?v=JeznW_7DlB0",
            resource_type="video",
            difficulty_level=2,
            estimated_time=4
        )
        py_oop_course = Resource.objects.create(
            title="Python OOP Masterclass (Course)",
            url="https://www.udemy.com/course/python-object-oriented-programming/",
            resource_type="course",
            difficulty_level=2,
            estimated_time=15
        )
        py_oop_book = Resource.objects.create(
            title="Python Object-Oriented Programming (Book)",
            url="https://www.packtpub.com/product/python-object-oriented-programming-fourth-edition/9781801077262",
            resource_type="book",
            difficulty_level=2,
            estimated_time=12
        )

        # Link Python resources
        python_syntax.learning_resources.add(py_syntax_article, py_syntax_video, py_syntax_course, py_syntax_book)
        python_types.learning_resources.add(py_types_article, py_types_video, py_types_course, py_types_book)
        python_oop.learning_resources.add(py_oop_article, py_oop_video, py_oop_course, py_oop_book)

        # Add resources for Python Operators
        py_operators_article = Resource.objects.create(
            title="Python Operators (Article)",
            url="https://www.w3schools.com/python/python_operators.asp",
            resource_type="article",
            difficulty_level=1,
            estimated_time=1
        )
        python_operators.learning_resources.add(py_operators_article)

        # Add resources for Python Control Flow
        py_control_article = Resource.objects.create(
            title="Python Control Flow (Article)",
            url="https://www.w3schools.com/python/python_conditions.asp",
            resource_type="article",
            difficulty_level=1,
            estimated_time=1
        )
        python_control.learning_resources.add(py_control_article)

        # Add resources for Python Methods
        py_methods_article = Resource.objects.create(
            title="Python Methods (Article)",
            url="https://www.w3schools.com/python/python_functions.asp",
            resource_type="article",
            difficulty_level=2,
            estimated_time=1
        )
        python_methods.learning_resources.add(py_methods_article)

        # Add resources for Python Collections (Lists, Sets, Dictionaries)
        py_collections_article = Resource.objects.create(
            title="Python Collections (Article)",
            url="https://www.w3schools.com/python/python_lists.asp",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        python_collections.learning_resources.add(py_collections_article)

        # Add resources for Python Exception Handling
        py_exceptions_article = Resource.objects.create(
            title="Python Exception Handling (Article)",
            url="https://docs.python.org/3/tutorial/errors.html",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        python_exceptions.learning_resources.add(py_exceptions_article)

        # Add resources for Python File I/O
        py_fileio_article = Resource.objects.create(
            title="Python File I/O (Article)",
            url="https://docs.python.org/3/tutorial/inputoutput.html",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        python_fileio.learning_resources.add(py_fileio_article)

        # Add resources for Python Threads & Concurrency
        py_threads_article = Resource.objects.create(
            title="Python Threading (Article)",
            url="https://docs.python.org/3/library/threading.html",
            resource_type="article",
            difficulty_level=3,
            estimated_time=3
        )
        python_threads.learning_resources.add(py_threads_article)

        # Add resources for Python Streams API (often covered with Iterators/Generators)
        py_streams_article = Resource.objects.create(
            title="Python Iterators and Generators (Article)",
            url="https://realpython.com/python-itertools/",
            resource_type="article",
            difficulty_level=3,
            estimated_time=2
        )
        python_streams.learning_resources.add(py_streams_article)

        # Add resources for Python Lambda Expressions
        py_lambdas_article = Resource.objects.create(
            title="Python Lambda Functions (Article)",
            url="https://realpython.com/python-lambda/",
            resource_type="article",
            difficulty_level=3,
            estimated_time=2
        )
        python_lambdas.learning_resources.add(py_lambdas_article)

        # Add resources for Python Annotations
        py_annotations_article = Resource.objects.create(
            title="Python Type Hinting (Article)",
            url="https://realpython.com/python-type-hinting/",
            resource_type="article",
            difficulty_level=3,
            estimated_time=2
        )
        python_annotations.learning_resources.add(py_annotations_article)

        # Add resources for Python Spring Basics (Assuming a Python equivalent or conceptual links)
        py_spring_article = Resource.objects.create(
            title="Python Web Frameworks Comparison (Article)",
            url="https://realpython.com/python-web-frameworks/",
            resource_type="article",
            difficulty_level=3,
            estimated_time=3
        )
        python_spring.learning_resources.add(py_spring_article)
        # --- Java Skill Tree ---
        Skill.objects.filter(category="Java").delete()
        java_syntax = Skill.objects.create(
            name="Java Syntax & Variables",
            description="Java syntax, variable declaration, data types, naming conventions.",
            difficulty_level=1,
            estimated_time=2,
            category="Java"
        )
        java_types = Skill.objects.create(
            name="Java Data Types",
            description="Primitive and reference types, type casting.",
            difficulty_level=1,
            estimated_time=2,
            category="Java"
        )
        java_operators = Skill.objects.create(
            name="Java Operators",
            description="Arithmetic, logical, comparison, assignment operators.",
            difficulty_level=1,
            estimated_time=1,
            category="Java"
        )
        java_control = Skill.objects.create(
            name="Java Control Flow",
            description="if, else, switch, for, while, break, continue.",
            difficulty_level=1,
            estimated_time=2,
            category="Java"
        )
        java_methods = Skill.objects.create(
            name="Java Methods",
            description="Defining methods, parameters, return types, overloading.",
            difficulty_level=2,
            estimated_time=2,
            category="Java"
        )
        java_oop = Skill.objects.create(
            name="Java OOP",
            description="Classes, objects, inheritance, polymorphism, encapsulation, abstraction.",
            difficulty_level=2,
            estimated_time=3,
            category="Java"
        )
        java_collections = Skill.objects.create(
            name="Java Collections",
            description="List, Set, Map, generics, iterators.",
            difficulty_level=2,
            estimated_time=2,
            category="Java"
        )
        java_exceptions = Skill.objects.create(
            name="Java Exception Handling",
            description="try, catch, finally, throw, custom exceptions.",
            difficulty_level=2,
            estimated_time=2,
            category="Java"
        )
        java_fileio = Skill.objects.create(
            name="Java File I/O",
            description="Reading/writing files, streams, serialization.",
            difficulty_level=2,
            estimated_time=2,
            category="Java"
        )
        java_threads = Skill.objects.create(
            name="Java Threads & Concurrency",
            description="Threads, synchronization, concurrency utilities.",
            difficulty_level=3,
            estimated_time=3,
            category="Java"
        )
        java_streams = Skill.objects.create(
            name="Java Streams API",
            description="Streams, functional operations, pipelines.",
            difficulty_level=3,
            estimated_time=2,
            category="Java"
        )
        java_lambdas = Skill.objects.create(
            name="Java Lambda Expressions",
            description="Lambda syntax, functional interfaces, usage.",
            difficulty_level=3,
            estimated_time=2,
            category="Java"
        )
        java_annotations = Skill.objects.create(
            name="Java Annotations",
            description="Built-in and custom annotations, reflection.",
            difficulty_level=3,
            estimated_time=2,
            category="Java"
        )
        java_spring = Skill.objects.create(
            name="Java Spring Basics",
            description="Spring framework, dependency injection, beans, configuration.",
            difficulty_level=3,
            estimated_time=3,
            category="Java"
        )
        # Prerequisites
        java_types.prerequisites.add(java_syntax)
        java_operators.prerequisites.add(java_types)
        java_control.prerequisites.add(java_operators)
        java_methods.prerequisites.add(java_control)
        java_oop.prerequisites.add(java_methods)
        java_collections.prerequisites.add(java_oop)
        java_exceptions.prerequisites.add(java_collections)
        java_fileio.prerequisites.add(java_exceptions)
        java_threads.prerequisites.add(java_fileio)
        java_streams.prerequisites.add(java_threads)
        java_lambdas.prerequisites.add(java_streams)
        java_annotations.prerequisites.add(java_lambdas)
        java_spring.prerequisites.add(java_annotations)
        # Java Syntax Resources
        java_syntax_article = Resource.objects.create(
            title="Java Syntax Guide (Article)",
            url="https://docs.oracle.com/javase/tutorial/",
            resource_type="article",
            difficulty_level=1,
            estimated_time=2
        )
        java_syntax_video = Resource.objects.create(
            title="Java Syntax Crash Course (Video)",
            url="https://www.youtube.com/watch?v=eIrMbAQSU34",
            resource_type="video",
            difficulty_level=1,
            estimated_time=3
        )
        java_syntax_course = Resource.objects.create(
            title="Java Programming Masterclass (Course)",
            url="https://www.udemy.com/course/java-the-complete-java-developer-course/",
            resource_type="course",
            difficulty_level=1,
            estimated_time=15
        )
        java_syntax_book = Resource.objects.create(
            title="Head First Java (Book)",
            url="https://www.amazon.com/Head-First-Java-Kathy-Sierra/dp/1491910771",
            resource_type="book",
            difficulty_level=1,
            estimated_time=12
        )

        # Java OOP Resources
        java_oop_article = Resource.objects.create(
            title="Java OOP Concepts (Article)",
            url="https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=3
        )
        java_oop_video = Resource.objects.create(
            title="Java OOP Tutorial (Video)",
            url="https://www.youtube.com/watch?v=1HZprU17HdE",
            resource_type="video",
            difficulty_level=2,
            estimated_time=4
        )
        java_oop_course = Resource.objects.create(
            title="Java OOP Complete Course (Course)",
            url="https://www.udemy.com/course/java-object-oriented-programming/",
            resource_type="course",
            difficulty_level=2,
            estimated_time=15
        )
        java_oop_book = Resource.objects.create(
            title="Effective Java (Book)",
            url="https://www.amazon.com/Effective-Java-Joshua-Bloch/dp/0134685997",
            resource_type="book",
            difficulty_level=2,
            estimated_time=12
        )

        # Java Collections Resources
        java_collections_article = Resource.objects.create(
            title="Java Collections Framework (Article)",
            url="https://www.geeksforgeeks.org/collections-in-java-2/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=3
        )
        java_collections_video = Resource.objects.create(
            title="Java Collections Tutorial (Video)",
            url="https://www.youtube.com/watch?v=GdAon80-0KA",
            resource_type="video",
            difficulty_level=2,
            estimated_time=4
        )
        java_collections_course = Resource.objects.create(
            title="Java Collections Framework (Course)",
            url="https://www.udemy.com/course/java-collections-framework/",
            resource_type="course",
            difficulty_level=2,
            estimated_time=12
        )
        java_collections_book = Resource.objects.create(
            title="Java Generics and Collections (Book)",
            url="https://www.oreilly.com/library/view/java-generics-and/0596527756/",
            resource_type="book",
            difficulty_level=2,
            estimated_time=10
        )

        # Link Java resources
        java_syntax.learning_resources.add(java_syntax_article, java_syntax_video, java_syntax_course, java_syntax_book)
        java_oop.learning_resources.add(java_oop_article, java_oop_video, java_oop_course, java_oop_book)
        java_collections.learning_resources.add(java_collections_article, java_collections_video, java_collections_course, java_collections_book)

        # Add resources for Java Data Types
        java_types_article = Resource.objects.create(
            title="Java Data Types (Article)",
            url="https://www.geeksforgeeks.org/java-data-types/",
            resource_type="article",
            difficulty_level=1,
            estimated_time=1
        )
        java_types.learning_resources.add(java_types_article)

        # Add resources for Java Operators
        java_operators_article = Resource.objects.create(
            title="Java Operators (Article)",
            url="https://www.geeksforgeeks.org/java-operators/",
            resource_type="article",
            difficulty_level=1,
            estimated_time=1
        )
        java_operators.learning_resources.add(java_operators_article)

        # Add resources for Java Control Flow
        java_control_article = Resource.objects.create(
            title="Java Control Flow (Article)",
            url="https://www.geeksforgeeks.org/java-control-statements/",
            resource_type="article",
            difficulty_level=1,
            estimated_time=1
        )
        java_control.learning_resources.add(java_control_article)

        # Add resources for Java Methods
        java_methods_article = Resource.objects.create(
            title="Java Methods (Article)",
            url="https://www.geeksforgeeks.org/methods-in-java/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=1
        )
        java_methods.learning_resources.add(java_methods_article)

        # Add resources for Java Exception Handling
        java_exceptions_article = Resource.objects.create(
            title="Java Exception Handling (Article)",
            url="https://www.geeksforgeeks.org/exception-handling-in-java/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        java_exceptions.learning_resources.add(java_exceptions_article)

        # Add resources for Java File I/O
        java_fileio_article = Resource.objects.create(
            title="Java File I/O (Article)",
            url="https://www.geeksforgeeks.org/java-file-handling/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        java_fileio.learning_resources.add(java_fileio_article)

        # Add resources for Java Threads & Concurrency
        java_threads_article = Resource.objects.create(
            title="Java Multithreading (Article)",
            url="https://www.geeksforgeeks.org/multithreading-in-java/",
            resource_type="article",
            difficulty_level=3,
            estimated_time=3
        )
        java_threads.learning_resources.add(java_threads_article)

        # Add resources for Java Streams API
        java_streams_article = Resource.objects.create(
            title="Java 8 Streams API (Article)",
            url="https://www.geeksforgeeks.org/java-8-streams/",
            resource_type="article",
            difficulty_level=3,
            estimated_time=2
        )
        java_streams.learning_resources.add(java_streams_article)

        # Add resources for Java Lambda Expressions
        java_lambdas_article = Resource.objects.create(
            title="Java Lambda Expressions (Article)",
            url="https://www.geeksforgeeks.org/lambda-expressions-in-java-8/",
            resource_type="article",
            difficulty_level=3,
            estimated_time=2
        )
        java_lambdas.learning_resources.add(java_lambdas_article)

        # Add resources for Java Annotations
        java_annotations_article = Resource.objects.create(
            title="Java Annotations (Article)",
            url="https://www.geeksforgeeks.org/annotations-in-java/",
            resource_type="article",
            difficulty_level=3,
            estimated_time=2
        )
        java_annotations.learning_resources.add(java_annotations_article)

        # Add resources for Java Spring Basics
        java_spring_article = Resource.objects.create(
            title="Spring Boot Introduction (Article)",
            url="https://spring.io/guides/gs/spring-boot/",
            resource_type="article",
            difficulty_level=3,
            estimated_time=3
        )
        java_spring.learning_resources.add(java_spring_article)
        # --- DSA Skill Tree ---
        Skill.objects.filter(category="DSA").delete()
        dsa_arrays = Skill.objects.create(
            name="Arrays",
            description="Array basics, operations, applications.",
            difficulty_level=1,
            estimated_time=2,
            category="DSA"
        )
        dsa_linked = Skill.objects.create(
            name="Linked Lists",
            description="Singly and doubly linked lists, operations.",
            difficulty_level=1,
            estimated_time=2,
            category="DSA"
        )
        dsa_stacks = Skill.objects.create(
            name="Stacks",
            description="Stack operations, applications, implementation.",
            difficulty_level=1,
            estimated_time=2,
            category="DSA"
        )
        dsa_queues = Skill.objects.create(
            name="Queues",
            description="Queue operations, circular queue, deque.",
            difficulty_level=1,
            estimated_time=2,
            category="DSA"
        )
        dsa_trees = Skill.objects.create(
            name="Trees",
            description="Binary trees, BST, traversals, heaps.",
            difficulty_level=2,
            estimated_time=3,
            category="DSA"
        )
        dsa_graphs = Skill.objects.create(
            name="Graphs",
            description="Graph representation, traversal (BFS, DFS).",
            difficulty_level=2,
            estimated_time=3,
            category="DSA"
        )
        dsa_hash = Skill.objects.create(
            name="Hash Tables",
            description="Hashing, collisions, applications.",
            difficulty_level=2,
            estimated_time=2,
            category="DSA"
        )
        dsa_sort = Skill.objects.create(
            name="Sorting Algorithms",
            description="Bubble, selection, insertion, merge, quick, heap sort.",
            difficulty_level=2,
            estimated_time=3,
            category="DSA"
        )
        dsa_search = Skill.objects.create(
            name="Searching Algorithms",
            description="Linear, binary search, applications.",
            difficulty_level=2,
            estimated_time=2,
            category="DSA"
        )
        dsa_recursion = Skill.objects.create(
            name="Recursion",
            description="Recursive thinking, base case, stack, applications.",
            difficulty_level=2,
            estimated_time=2,
            category="DSA"
        )
        dsa_dp = Skill.objects.create(
            name="Dynamic Programming",
            description="Memoization, tabulation, classic DP problems.",
            difficulty_level=3,
            estimated_time=3,
            category="DSA"
        )
        dsa_greedy = Skill.objects.create(
            name="Greedy Algorithms",
            description="Greedy strategy, classic greedy problems.",
            difficulty_level=3,
            estimated_time=2,
            category="DSA"
        )
        dsa_backtrack = Skill.objects.create(
            name="Backtracking",
            description="Backtracking template, classic problems.",
            difficulty_level=3,
            estimated_time=2,
            category="DSA"
        )
        dsa_complexity = Skill.objects.create(
            name="Complexity Analysis",
            description="Big O notation, time/space complexity.",
            difficulty_level=2,
            estimated_time=2,
            category="DSA"
        )
        # Prerequisites
        dsa_linked.prerequisites.add(dsa_arrays)
        dsa_stacks.prerequisites.add(dsa_linked)
        dsa_queues.prerequisites.add(dsa_stacks)
        dsa_trees.prerequisites.add(dsa_queues)
        dsa_graphs.prerequisites.add(dsa_trees)
        dsa_hash.prerequisites.add(dsa_graphs)
        dsa_sort.prerequisites.add(dsa_hash)
        dsa_search.prerequisites.add(dsa_sort)
        dsa_recursion.prerequisites.add(dsa_search)
        dsa_dp.prerequisites.add(dsa_recursion)
        dsa_greedy.prerequisites.add(dsa_dp)
        dsa_backtrack.prerequisites.add(dsa_greedy)
        dsa_complexity.prerequisites.add(dsa_backtrack)
        # Resources for foundational skill
        dsa_arrays.learning_resources.add(
            Resource.objects.create(
                title="Arrays in Data Structures (Article)",
                url="https://www.geeksforgeeks.org/array-data-structure/",
                resource_type="article",
                difficulty_level=1,
                estimated_time=2
            ),
            Resource.objects.create(
                title="Arrays Crash Course (Video)",
                url="https://www.youtube.com/watch?v=QJNwK2uJyGs",
                resource_type="video",
                difficulty_level=1,
                estimated_time=3
            ),
            Resource.objects.create(
                title="Data Structures and Algorithms (Course)",
                url="https://www.udemy.com/course/data-structures-and-algorithms-deep-dive-using-java/",
                resource_type="course",
                difficulty_level=1,
                estimated_time=15
            ),
            Resource.objects.create(
                title="Data Structures and Algorithms Made Easy (Book)",
                url="https://www.amazon.com/Data-Structures-Algorithms-Made-Easy/dp/819324527X",
                resource_type="book",
                difficulty_level=1,
                estimated_time=12
            )
        )
        # Add resources for Linked Lists
        dsa_linked_article = Resource.objects.create(
            title="Linked List Data Structure (Article)",
            url="https://www.geeksforgeeks.org/data-structures-and-algorithms-linked-list/",
            resource_type="article",
            difficulty_level=1,
            estimated_time=2
        )
        dsa_linked.learning_resources.add(dsa_linked_article)

        # Add resources for Stacks
        dsa_stacks_article = Resource.objects.create(
            title="Stack Data Structure (Article)",
            url="https://www.geeksforgeeks.org/stack-data-structure-introduction-and-array-implementation/",
            resource_type="article",
            difficulty_level=1,
            estimated_time=2
        )
        dsa_stacks.learning_resources.add(dsa_stacks_article)

        # Add resources for Queues
        dsa_queues_article = Resource.objects.create(
            title="Queue Data Structure (Article)",
            url="https://www.geeksforgeeks.org/queue-data-structure/",
            resource_type="article",
            difficulty_level=1,
            estimated_time=2
        )
        dsa_queues.learning_resources.add(dsa_queues_article)

        # Add resources for Trees
        dsa_trees_article = Resource.objects.create(
            title="Tree Data Structure (Article)",
            url="https://www.geeksforgeeks.org/tree-data-structure/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=3
        )
        dsa_trees.learning_resources.add(dsa_trees_article)

        # Add resources for Graphs
        dsa_graphs_article = Resource.objects.create(
            title="Graph Data Structure (Article)",
            url="https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=3
        )
        dsa_graphs.learning_resources.add(dsa_graphs_article)

        # Add resources for Hash Tables
        dsa_hash_article = Resource.objects.create(
            title="Hashing in Data Structures (Article)",
            url="https://www.geeksforgeeks.org/hashing-data-structure/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        dsa_hash.learning_resources.add(dsa_hash_article)

        # Add resources for Sorting Algorithms
        dsa_sort_article = Resource.objects.create(
            title="Sorting Algorithms (Article)",
            url="https://www.geeksforgeeks.org/sorting-algorithms/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=3
        )
        dsa_sort.learning_resources.add(dsa_sort_article)

        # Add resources for Searching Algorithms
        dsa_search_article = Resource.objects.create(
            title="Searching Algorithms (Article)",
            url="https://www.geeksforgeeks.org/searching-algorithms/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        dsa_search.learning_resources.add(dsa_search_article)

        # Add resources for Recursion
        dsa_recursion_article = Resource.objects.create(
            title="Recursion (Article)",
            url="https://www.geeksforgeeks.org/recursion-in-programming/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        dsa_recursion.learning_resources.add(dsa_recursion_article)

        # Add resources for Dynamic Programming
        dsa_dp_article = Resource.objects.create(
            title="Dynamic Programming (Article)",
            url="https://www.geeksforgeeks.org/dynamic-programming/",
            resource_type="article",
            difficulty_level=3,
            estimated_time=3
        )
        dsa_dp.learning_resources.add(dsa_dp_article)

        # Add resources for Greedy Algorithms
        dsa_greedy_article = Resource.objects.create(
            title="Greedy Algorithms (Article)",
            url="https://www.geeksforgeeks.org/greedy-algorithms/",
            resource_type="article",
            difficulty_level=3,
            estimated_time=2
        )
        dsa_greedy.learning_resources.add(dsa_greedy_article)

        # Add resources for Backtracking
        dsa_backtrack_article = Resource.objects.create(
            title="Backtracking (Article)",
            url="https://www.geeksforgeeks.org/backtracking-algorithms/",
            resource_type="article",
            difficulty_level=3,
            estimated_time=2
        )
        dsa_backtrack.learning_resources.add(dsa_backtrack_article)

        # Add resources for Complexity Analysis
        dsa_complexity_article = Resource.objects.create(
            title="Complexity Analysis (Article)",
            url="https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        dsa_complexity.learning_resources.add(dsa_complexity_article)
        # --- Machine Learning Skill Tree ---
        Skill.objects.filter(category="ML").delete()
        ml_basics = Skill.objects.create(
            name="ML Basics & Terminology",
            description="What is ML, types of ML, basic terms.",
            difficulty_level=1,
            estimated_time=2,
            category="ML"
        )
        ml_data = Skill.objects.create(
            name="Data Preprocessing",
            description="Cleaning, encoding, scaling, splitting data.",
            difficulty_level=1,
            estimated_time=2,
            category="ML"
        )
        ml_features = Skill.objects.create(
            name="Feature Engineering",
            description="Feature selection, extraction, creation.",
            difficulty_level=2,
            estimated_time=2,
            category="ML"
        )
        ml_supervised = Skill.objects.create(
            name="Supervised Learning",
            description="Regression, classification, algorithms.",
            difficulty_level=2,
            estimated_time=3,
            category="ML"
        )
        ml_unsupervised = Skill.objects.create(
            name="Unsupervised Learning",
            description="Clustering, dimensionality reduction.",
            difficulty_level=2,
            estimated_time=2,
            category="ML"
        )
        ml_eval = Skill.objects.create(
            name="Model Evaluation",
            description="Metrics, cross-validation, confusion matrix.",
            difficulty_level=2,
            estimated_time=2,
            category="ML"
        )
        ml_overfit = Skill.objects.create(
            name="Overfitting & Regularization",
            description="Bias-variance, regularization techniques.",
            difficulty_level=3,
            estimated_time=2,
            category="ML"
        )
        ml_trees = Skill.objects.create(
            name="Decision Trees & Random Forests",
            description="Tree-based models, ensemble methods.",
            difficulty_level=3,
            estimated_time=2,
            category="ML"
        )
        ml_svm = Skill.objects.create(
            name="Support Vector Machines",
            description="SVM theory, kernels, applications.",
            difficulty_level=3,
            estimated_time=2,
            category="ML"
        )
        ml_nn = Skill.objects.create(
            name="Neural Networks (Basics)",
            description="Perceptron, MLP, activation functions.",
            difficulty_level=3,
            estimated_time=2,
            category="ML"
        )
        ml_deep = Skill.objects.create(
            name="Deep Learning",
            description="CNN, RNN, transfer learning, frameworks.",
            difficulty_level=3,
            estimated_time=3,
            category="ML"
        )
        ml_nlp = Skill.objects.create(
            name="Natural Language Processing",
            description="Tokenization, embeddings, NLP tasks.",
            difficulty_level=3,
            estimated_time=2,
            category="ML"
        )
        ml_deploy = Skill.objects.create(
            name="Model Deployment",
            description="Saving, loading, serving models, APIs.",
            difficulty_level=3,
            estimated_time=2,
            category="ML"
        )
        # Prerequisites
        ml_data.prerequisites.add(ml_basics)
        ml_features.prerequisites.add(ml_data)
        ml_supervised.prerequisites.add(ml_features)
        ml_unsupervised.prerequisites.add(ml_features)
        ml_eval.prerequisites.add(ml_supervised)
        ml_overfit.prerequisites.add(ml_eval)
        ml_trees.prerequisites.add(ml_overfit)
        ml_svm.prerequisites.add(ml_trees)
        ml_nn.prerequisites.add(ml_svm)
        ml_deep.prerequisites.add(ml_nn)
        ml_nlp.prerequisites.add(ml_deep)
        ml_deploy.prerequisites.add(ml_nlp)
        # Resources for foundational skill
        ml_basics.learning_resources.add(
            Resource.objects.create(
                title="Machine Learning Crash Course (Article)",
                url="https://developers.google.com/machine-learning/crash-course/ml-intro",
                resource_type="article",
                difficulty_level=1,
                estimated_time=1
            ),
            Resource.objects.create(
                title="Machine Learning Full Course (Video)",
                url="https://www.youtube.com/watch?v=Gv9_4yMHFhI",
                resource_type="video",
                difficulty_level=1,
                estimated_time=2
            ),
            Resource.objects.create(
                title="Machine Learning by Andrew Ng (Course)",
                url="https://www.coursera.org/learn/machine-learning",
                resource_type="course",
                difficulty_level=1,
                estimated_time=10
            ),
            Resource.objects.create(
                title="Hands-On Machine Learning (Book)",
                url="https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/",
                resource_type="book",
                difficulty_level=1,
                estimated_time=8
            )
        )
        # ML Basics Resources
        ml_basics_article = Resource.objects.create(
            title="Machine Learning Basics (Article)",
            url="https://developers.google.com/machine-learning/crash-course/ml-intro",
            resource_type="article",
            difficulty_level=1,
            estimated_time=3
        )
        ml_basics_video = Resource.objects.create(
            title="ML Crash Course (Video)",
            url="https://www.youtube.com/watch?v=KNAWp2S3w94",
            resource_type="video",
            difficulty_level=1,
            estimated_time=4
        )
        ml_basics_course = Resource.objects.create(
            title="Machine Learning by Andrew Ng (Course)",
            url="https://www.coursera.org/learn/machine-learning",
            resource_type="course",
            difficulty_level=1,
            estimated_time=20
        )
        ml_basics_book = Resource.objects.create(
            title="Hands-On Machine Learning (Book)",
            url="https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/",
            resource_type="book",
            difficulty_level=1,
            estimated_time=15
        )

        # Data Preprocessing Resources
        ml_data_article = Resource.objects.create(
            title="Data Preprocessing Guide (Article)",
            url="https://www.geeksforgeeks.org/data-preprocessing-machine-learning-python/",
            resource_type="article",
            difficulty_level=1,
            estimated_time=3
        )
        ml_data_video = Resource.objects.create(
            title="Data Preprocessing Tutorial (Video)",
            url="https://www.youtube.com/watch?v=8p6XaQSIFpY",
            resource_type="video",
            difficulty_level=1,
            estimated_time=4
        )
        ml_data_course = Resource.objects.create(
            title="Data Preprocessing for Machine Learning (Course)",
            url="https://www.udemy.com/course/data-preprocessing-for-machine-learning/",
            resource_type="course",
            difficulty_level=1,
            estimated_time=12
        )
        ml_data_book = Resource.objects.create(
            title="Python for Data Analysis (Book)",
            url="https://www.oreilly.com/library/view/python-for-data/9781491957653/",
            resource_type="book",
            difficulty_level=1,
            estimated_time=15
        )

        # Supervised Learning Resources
        ml_supervised_article = Resource.objects.create(
            title="Supervised Learning Guide (Article)",
            url="https://www.geeksforgeeks.org/supervised-unsupervised-learning/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=3
        )
        ml_supervised_video = Resource.objects.create(
            title="Supervised Learning Tutorial (Video)",
            url="https://www.youtube.com/watch?v=7JhD1Vvx120",
            resource_type="video",
            difficulty_level=2,
            estimated_time=4
        )
        ml_supervised_course = Resource.objects.create(
            title="Supervised Machine Learning (Course)",
            url="https://www.coursera.org/learn/supervised-machine-learning",
            resource_type="course",
            difficulty_level=2,
            estimated_time=15
        )
        ml_supervised_book = Resource.objects.create(
            title="Introduction to Machine Learning with Python (Book)",
            url="https://www.oreilly.com/library/view/introduction-to-machine/9781449369880/",
            resource_type="book",
            difficulty_level=2,
            estimated_time=12
        )

        # Link ML resources
        ml_basics.learning_resources.add(ml_basics_article, ml_basics_video, ml_basics_course, ml_basics_book)
        ml_data.learning_resources.add(ml_data_article, ml_data_video, ml_data_course, ml_data_book)
        ml_supervised.learning_resources.add(ml_supervised_article, ml_supervised_video, ml_supervised_course, ml_supervised_book)

        # Add resources for ML Features
        ml_features_article = Resource.objects.create(
            title="Feature Engineering Guide (Article)",
            url="https://towardsdatascience.com/feature-engineering-for-machine-learning-3a5e2934fe54",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        ml_features.learning_resources.add(ml_features_article)

        # Add resources for Unsupervised Learning
        ml_unsupervised_article = Resource.objects.create(
            title="Unsupervised Learning Explained (Article)",
            url="https://www.geeksforgeeks.org/supervised-vs-unsupervised-learning/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        ml_unsupervised.learning_resources.add(ml_unsupervised_article)

        # Add resources for Model Evaluation
        ml_eval_article = Resource.objects.create(
            title="Machine Learning Model Evaluation Metrics (Article)",
            url="https://www.geeksforgeeks.org/common-evaluation-metrics-for-machine-learning/",
            resource_type="article",
            difficulty_level=2,
            estimated_time=2
        )
        ml_eval.learning_resources.add(ml_eval_article)

        # Add resources for Overfitting & Regularization
        ml_overfit_article = Resource.objects.create(
            title="Overfitting and Underfitting (Article)",
            url="https://towardsdatascience.com/understanding-underfitting-and-overfitting-in-machine-learning-b811a0c9d127",
            resource_type="article",
            difficulty_level=3,
            estimated_time=2
        )
        ml_overfit.learning_resources.add(ml_overfit_article)

        # Add resources for Decision Trees & Random Forests
        ml_trees_article = Resource.objects.create(
            title="Decision Tree and Random Forest (Article)",
            url="https://www.geeksforgeeks.org/decision-tree/",
            resource_type="article",
            difficulty_level=3,
            estimated_time=2
        )
        ml_trees.learning_resources.add(ml_trees_article)

        # Add resources for Support Vector Machines
        ml_svm_article = Resource.objects.create(
            title="Support Vector Machine (Article)",
            url="https://www.geeksforgeeks.org/introduction-to-support-vector-machines-svm/",
            resource_type="article",
            difficulty_level=3,
            estimated_time=2
        )
        ml_svm.learning_resources.add(ml_svm_article)

        # Add resources for Neural Networks (Basics)
        ml_nn_article = Resource.objects.create(
            title="Introduction to Neural Networks (Article)",
            url="https://www.geeksforgeeks.org/introduction-to-neural-networks/",
            resource_type="article",
            difficulty_level=3,
            estimated_time=2
        )
        ml_nn.learning_resources.add(ml_nn_article)

        # Add resources for Deep Learning
        ml_deep_article = Resource.objects.create(
            title="Introduction to Deep Learning (Article)",
            url="https://www.geeksforgeeks.org/introduction-to-deep-learning/",
            resource_type="article",
            difficulty_level=3,
            estimated_time=3
        )
        ml_deep.learning_resources.add(ml_deep_article)

        # Add resources for Natural Language Processing
        ml_nlp_article = Resource.objects.create(
            title="Introduction to NLP (Article)",
            url="https://www.geeksforgeeks.org/introduction-to-nlp-natural-language-processing/",
            resource_type="article",
            difficulty_level=3,
            estimated_time=2
        )
        ml_nlp.learning_resources.add(ml_nlp_article)

        # Add resources for Model Deployment
        ml_deploy_article = Resource.objects.create(
            title="Machine Learning Model Deployment (Article)",
            url="https://www.geeksforgeeks.org/machine-learning-model-deployment/",
            resource_type="article",
            difficulty_level=3,
            estimated_time=2
        )
        ml_deploy.learning_resources.add(ml_deploy_article)
        # --- Android Development Skill Tree ---
        Skill.objects.filter(category="Android").delete()
        android_studio = Skill.objects.create(
            name="Android Studio Setup",
            description="Installing Android Studio, SDK, emulator setup.",
            difficulty_level=1,
            estimated_time=2,
            category="Android"
        )
        android_project = Skill.objects.create(
            name="Project Structure & Gradle",
            description="Understanding project files, Gradle basics.",
            difficulty_level=1,
            estimated_time=2,
            category="Android"
        )
        android_activities = Skill.objects.create(
            name="Activities & Lifecycle",
            description="Activity basics, lifecycle methods, intents.",
            difficulty_level=1,
            estimated_time=2,
            category="Android"
        )
        android_intents = Skill.objects.create(
            name="Intents & Navigation",
            description="Explicit/implicit intents, navigation, passing data.",
            difficulty_level=1,
            estimated_time=2,
            category="Android"
        )
        android_ui = Skill.objects.create(
            name="UI Layouts",
            description="XML layouts, ConstraintLayout, LinearLayout, RelativeLayout.",
            difficulty_level=2,
            estimated_time=2,
            category="Android"
        )
        android_views = Skill.objects.create(
            name="Views & Widgets",
            description="Buttons, TextViews, RecyclerView, adapters.",
            difficulty_level=2,
            estimated_time=2,
            category="Android"
        )
        android_resources = Skill.objects.create(
            name="Resources (Strings, Colors, Styles)",
            description="Managing resources, themes, styles, localization.",
            difficulty_level=2,
            estimated_time=2,
            category="Android"
        )
        android_input = Skill.objects.create(
            name="User Input & Forms",
            description="Input controls, validation, forms.",
            difficulty_level=2,
            estimated_time=2,
            category="Android"
        )
        android_storage = Skill.objects.create(
            name="Data Storage",
            description="SharedPreferences, SQLite, Room.",
            difficulty_level=2,
            estimated_time=2,
            category="Android"
        )
        android_network = Skill.objects.create(
            name="Networking",
            description="HTTP, Retrofit, Volley, APIs.",
            difficulty_level=3,
            estimated_time=2,
            category="Android"
        )
        android_bg = Skill.objects.create(
            name="Background Tasks",
            description="AsyncTask, WorkManager, background processing.",
            difficulty_level=3,
            estimated_time=2,
            category="Android"
        )
        android_notifications = Skill.objects.create(
            name="Notifications",
            description="NotificationManager, custom notifications.",
            difficulty_level=3,
            estimated_time=2,
            category="Android"
        )
        android_permissions = Skill.objects.create(
            name="Permissions",
            description="Requesting permissions, runtime permissions.",
            difficulty_level=3,
            estimated_time=2,
            category="Android"
        )
        android_publish = Skill.objects.create(
            name="Publishing to Play Store",
            description="App signing, release builds, Play Store listing.",
            difficulty_level=3,
            estimated_time=2,
            category="Android"
        )
        # Prerequisites
        android_project.prerequisites.add(android_studio)
        android_activities.prerequisites.add(android_project)
        android_intents.prerequisites.add(android_activities)
        android_ui.prerequisites.add(android_intents)
        android_views.prerequisites.add(android_ui)
        android_resources.prerequisites.add(android_views)
        android_input.prerequisites.add(android_resources)
        android_storage.prerequisites.add(android_input)
        android_network.prerequisites.add(android_storage)
        android_bg.prerequisites.add(android_network)
        android_notifications.prerequisites.add(android_bg)
        android_permissions.prerequisites.add(android_notifications)
        android_publish.prerequisites.add(android_permissions)
        # Android Studio Resources
        android_studio_article = Resource.objects.create(
            title="Android Studio Setup (Article)",
            url="https://developer.android.com/studio/install",
            resource_type="article",
            difficulty_level=1,
            estimated_time=1
        )
        android_studio_video = Resource.objects.create(
            title="Android Studio Tutorial (Video)",
            url="https://www.youtube.com/watch?v=Uz6OFUQ5l5k",
            resource_type="video",
            difficulty_level=1,
            estimated_time=2
        )
        android_studio_course = Resource.objects.create(
            title="Android Basics Nanodegree (Course)",
            url="https://www.udacity.com/course/android-basics-nanodegree-by-google--nd803",
            resource_type="course",
            difficulty_level=1,
            estimated_time=10
        )
        android_studio_book = Resource.objects.create(
            title="Head First Android Development (Book)",
            url="https://www.amazon.com/Head-First-Android-Development-2nd/dp/1491974052/",
            resource_type="book",
            difficulty_level=1,
            estimated_time=8
        )

        # Android Activities Resources
        android_activities_article = Resource.objects.create(
            title="Android Activities Guide (Article)",
            url="https://developer.android.com/guide/components/activities",
            resource_type="article",
            difficulty_level=1,
            estimated_time=2
        )
        android_activities_video = Resource.objects.create(
            title="Android Activities Tutorial (Video)",
            url="https://www.youtube.com/watch?v=1Z9kN-S9604",
            resource_type="video",
            difficulty_level=1,
            estimated_time=3
        )
        android_activities_course = Resource.objects.create(
            title="Android App Development (Course)",
            url="https://www.udemy.com/course/android-app-development-with-kotlin/",
            resource_type="course",
            difficulty_level=1,
            estimated_time=15
        )
        android_activities_book = Resource.objects.create(
            title="Android Programming with Kotlin for Beginners (Book)",
            url="https://www.packtpub.com/product/android-programming-with-kotlin-for-beginners/9781789615401",
            resource_type="book",
            difficulty_level=1,
            estimated_time=12
        )

        # Android UI Resources
        android_ui_article = Resource.objects.create(
            title="Android UI Design Guide (Article)",
            url="https://developer.android.com/guide/topics/ui",
            resource_type="article",
            difficulty_level=2,
            estimated_time=3
        )
        android_ui_video = Resource.objects.create(
            title="Android UI Design Tutorial (Video)",
            url="https://www.youtube.com/watch?v=5gFrXGbDHSc",
            resource_type="video",
            difficulty_level=2,
            estimated_time=4
        )
        android_ui_course = Resource.objects.create(
            title="Android UI Design (Course)",
            url="https://www.udemy.com/course/android-ui-design/",
            resource_type="course",
            difficulty_level=2,
            estimated_time=12
        )
        android_ui_book = Resource.objects.create(
            title="Android UI Development (Book)",
            url="https://www.packtpub.com/product/android-ui-development/9781785888885",
            resource_type="book",
            difficulty_level=2,
            estimated_time=10
        )

        # Link Android resources
        android_studio.learning_resources.add(android_studio_article, android_studio_video, android_studio_course, android_studio_book)
        android_activities.learning_resources.add(android_activities_article, android_activities_video, android_activities_course, android_activities_book)
        android_ui.learning_resources.add(android_ui_article, android_ui_video, android_ui_course, android_ui_book)

        # --- Master Level Skills for Python Domain ---
        python_advanced = python_spring  # last advanced skill
        py_master_ai = Skill.objects.create(
            name="Python AI Mastery",
            description="Master advanced AI and ML with Python.",
            difficulty_level=4,
            estimated_time=6,
            category="Python"
        )
        py_master_ai.prerequisites.add(python_advanced)
        py_master_ai_resource = Resource.objects.create(
            title="Python AI Mastery (Course)",
            url="https://www.coursera.org/specializations/ai-for-everyone",
            resource_type="course",
            difficulty_level=4,
            estimated_time=10
        )
        py_master_ai.learning_resources.add(py_master_ai_resource)
        py_master_web = Skill.objects.create(
            name="Python Web Mastery",
            description="Master advanced web frameworks and deployment in Python.",
            difficulty_level=4,
            estimated_time=5,
            category="Python"
        )
        py_master_web.prerequisites.add(py_master_ai)
        py_master_web_resource = Resource.objects.create(
            title="Advanced Python Web (Article)",
            url="https://realpython.com/tutorials/web-development/",
            resource_type="article",
            difficulty_level=4,
            estimated_time=3
        )
        py_master_web.learning_resources.add(py_master_web_resource)
        # --- Master Level Skills for Java Domain ---
        java_advanced = java_spring  # last advanced skill
        java_master_enterprise = Skill.objects.create(
            name="Java Enterprise Mastery",
            description="Master advanced Java EE and enterprise patterns.",
            difficulty_level=4,
            estimated_time=6,
            category="Java"
        )
        java_master_enterprise.prerequisites.add(java_advanced)
        java_master_enterprise_resource = Resource.objects.create(
            title="Java EE Mastery (Course)",
            url="https://www.udemy.com/course/java-ee/",
            resource_type="course",
            difficulty_level=4,
            estimated_time=10
        )
        java_master_enterprise.learning_resources.add(java_master_enterprise_resource)
        java_master_performance = Skill.objects.create(
            name="Java Performance Mastery",
            description="Master advanced Java performance and tuning.",
            difficulty_level=4,
            estimated_time=5,
            category="Java"
        )
        java_master_performance.prerequisites.add(java_master_enterprise)
        java_master_performance_resource = Resource.objects.create(
            title="Java Performance (Article)",
            url="https://www.oracle.com/technical-resources/articles/java/perftuning.html",
            resource_type="article",
            difficulty_level=4,
            estimated_time=3
        )
        java_master_performance.learning_resources.add(java_master_performance_resource)
        # --- Master Level Skills for DSA Domain ---
        dsa_advanced = dsa_complexity  # last advanced skill
        dsa_master_algo = Skill.objects.create(
            name="Algorithmic Mastery",
            description="Master advanced algorithms and problem solving.",
            difficulty_level=4,
            estimated_time=7,
            category="DSA"
        )
        dsa_master_algo.prerequisites.add(dsa_advanced)
        dsa_master_algo_resource = Resource.objects.create(
            title="Advanced Algorithms (Course)",
            url="https://www.coursera.org/specializations/algorithms",
            resource_type="course",
            difficulty_level=4,
            estimated_time=12
        )
        dsa_master_algo.learning_resources.add(dsa_master_algo_resource)
        dsa_master_competitive = Skill.objects.create(
            name="Competitive Programming Mastery",
            description="Master competitive programming and coding contests.",
            difficulty_level=4,
            estimated_time=6,
            category="DSA"
        )
        dsa_master_competitive.prerequisites.add(dsa_master_algo)
        dsa_master_competitive_resource = Resource.objects.create(
            title="Competitive Programming (Article)",
            url="https://cp-algorithms.com/",
            resource_type="article",
            difficulty_level=4,
            estimated_time=4
        )
        dsa_master_competitive.learning_resources.add(dsa_master_competitive_resource)
        # --- Master Level Skills for ML Domain ---
        ml_advanced = ml_deploy  # last advanced skill
        ml_master_deep = Skill.objects.create(
            name="Deep Learning Mastery",
            description="Master advanced deep learning architectures and research.",
            difficulty_level=4,
            estimated_time=8,
            category="ML"
        )
        ml_master_deep.prerequisites.add(ml_advanced)
        ml_master_deep_resource = Resource.objects.create(
            title="Deep Learning Specialization (Course)",
            url="https://www.coursera.org/specializations/deep-learning",
            resource_type="course",
            difficulty_level=4,
            estimated_time=15
        )
        ml_master_deep.learning_resources.add(ml_master_deep_resource)
        ml_master_nlp = Skill.objects.create(
            name="NLP Mastery",
            description="Master advanced NLP and language models.",
            difficulty_level=4,
            estimated_time=7,
            category="ML"
        )
        ml_master_nlp.prerequisites.add(ml_master_deep)
        ml_master_nlp_resource = Resource.objects.create(
            title="Advanced NLP (Article)",
            url="https://ruder.io/nlp-beyond-deep-learning/",
            resource_type="article",
            difficulty_level=4,
            estimated_time=4
        )
        ml_master_nlp.learning_resources.add(ml_master_nlp_resource)
        # --- Master Level Skills for Android Domain ---
        android_advanced = android_publish  # last advanced skill
        android_master_arch = Skill.objects.create(
            name="Android Architecture Mastery",
            description="Master advanced Android app architecture and modularization.",
            difficulty_level=4,
            estimated_time=6,
            category="Android"
        )
        android_master_arch.prerequisites.add(android_advanced)
        android_master_arch_resource = Resource.objects.create(
            title="Android Architecture (Course)",
            url="https://www.udemy.com/course/android-architecture-components/",
            resource_type="course",
            difficulty_level=4,
            estimated_time=10
        )
        android_master_arch.learning_resources.add(android_master_arch_resource)
        android_master_perf = Skill.objects.create(
            name="Android Performance Mastery",
            description="Master advanced Android performance and optimization.",
            difficulty_level=4,
            estimated_time=5,
            category="Android"
        )
        android_master_perf.prerequisites.add(android_master_arch)
        android_master_perf_resource = Resource.objects.create(
            title="Android Performance (Article)",
            url="https://developer.android.com/topic/performance",
            resource_type="article",
            difficulty_level=4,
            estimated_time=3
        )
        android_master_perf.learning_resources.add(android_master_perf_resource)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with a comprehensive skill tree and resources!')) 