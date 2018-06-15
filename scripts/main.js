
require.config({
    baseUrl: './',
    urlArgs: 'bust=' + Date.now(),
    paths: {
        jquery: 'scripts/jquery-3.2.1.min',
        prism: 'scripts/prism'
    }
})





require([
    'jquery',
    'prism'
], function ($, Prism) {

    var stepsCount
    var pageButtonTemplate

    $(function () {
        stepsCount = $('.content').length
        pageButtonTemplate = $('#page_button_template').html()

        $('#ok').on('click', function () {
            displayStep(currentStep + 1)
        })

        $('#pagination').on('click', '.page_button', function () {
            displayStep($(this).find('span').data('step'))
        })

        displayStep(1)

    })


    var currentStep

    function displayStep (step) {
        currentStep = step
        displayContent(step)
        displayCode(step)

        if (currentStep >= stepsCount) {
            $('#ok').hide()
        }

        displayPageButton(step)
    }


    function displayPageButton (step) {
        $('.page_button').removeClass('active')

        var $pageButton = $('#pagination [data-step="' + step + '"]').parent()
        if ($pageButton.length === 0) {
            $pageButton = $(pageButtonTemplate)
            $pageButton.find('span').attr('data-step', step).text(step)
            $('#pagination').append($pageButton)
        }

        $pageButton.addClass('active')
    }


    function displayContent (step) {
        $('.content').hide()
        $('.content[data-step="' + step + '"]').show()
    }


    function displayCode (step) {
        $('.code').html(javaScript(getCode(step).trim()))
    }

    function getCode (step) {
        var $code = $('script[data-step="' + step + '"]')
        if ($code.length > 0) {
            return $('script[data-step="' + step + '"]').text()
        } else {
            return '<div class="illidan"></div>'
        }
    }


    function javaScriptElement (source) {
        return $('<pre><code class="language-javascript">' + source + '</code></pre>')
    }


    function highlight ($container) {
        Prism.highlightElement($container.find('code')[0])
        return $container
    }


    function javaScript (source) {
        return highlight(javaScriptElement(source))
    }




})
