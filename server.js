const express = require('express')

const  app = express()

const users = [
    {
        id: 1,
        full_name: 'João Alves'
    },
    {
        id: 2,
        full_name: 'Adriano Cirino'
    },
    {
        id: 3,
        full_name: 'Gilton Carvalho'
    },
    {
        id: 4,
        full_name: 'Maycon Douglas'
    },
    {
        id: 5,
        full_name: 'Rodrigo Barbosa'
    },
    {
        id: 6,
        full_name: 'Igor Terriaga'
    },
    {
        id: 7,
        full_name: 'Idyl Ícaro'
    },
    {
        id: 8,
        full_name: 'Liliane Santana'
    },
    {
        id: 9,
        full_name: 'Raphael Oliveira'
    },
    {
        id: 10,
        full_name: 'André Luís'
    },
    {
        id: 11,
        full_name: 'Kaic Barros'
    },
    {
        id: 12,
        full_name: 'Jadson Ribeiro'
    },
    {
        id: 13,
        full_name: 'Gabriel Santana'
    },
    {
        id: 14,
        full_name: 'Igor Bruno'
    },
    {
        id: 15,
        full_name: 'Abraão Alves'
    },
    {
        id: 16,
        full_name: 'Jeovane Ferreira'
    },
    {
        id: 17,
        full_name: 'Clovijan Bispo'
    },
    {
        id: 18,
        full_name: 'Mikaely Mendonça'
    }
    ,
    {
        id: 19,
        full_name: 'Kamila Mendonça'
    },
    {
        id: 20,
        full_name: 'Layla Joana'
    }

]

// get paginated results
app.get('/users/paginate', paginatedResults(users), (req, res) => {
    res.json(res.paginatedResults)
})

function paginatedResults(model) {
    // middleware function
    return (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        // calculating the starting and ending index
        const startIndex = (page-1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < model.length) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page -1,
                limit: limit
            }
        }

        results.results = model.slice(startIndex, endIndex)

        res.paginatedResults = results
        next()
    }
}

const port = 3006
const url = 'http://localhost:' + port
app.listen(port, () => {
    console.log("Service endpoint= $s", url)
})